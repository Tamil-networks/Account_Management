const Fuse = require("fuse.js");


// ------------------------------------
// Normalize text
// ------------------------------------

const normalizeText = (text) => {

    if (!text) return "";

    return text
        .toString()
        .normalize("NFC")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
};


// ------------------------------------
// Levenshtein Distance
// ------------------------------------

const levenshteinDistance = (a, b) => {

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {

        for (let j = 1; j <= a.length; j++) {

            if (b.charAt(i - 1) === a.charAt(j - 1)) {

                matrix[i][j] = matrix[i - 1][j - 1];

            } else {

                matrix[i][j] = Math.min(

                    matrix[i - 1][j - 1] + 1,

                    matrix[i][j - 1] + 1,

                    matrix[i - 1][j] + 1

                );

            }
        }
    }

    return matrix[b.length][a.length];
};


// ------------------------------------
// Similarity percentage
// ------------------------------------

const similarityScore = (a, b) => {

    a = normalizeText(a);
    b = normalizeText(b);

    if (!a || !b) {
        return 0;
    }

    if (a === b) {
        return 100;
    }

    const distance = levenshteinDistance(a, b);

    const maxLength = Math.max(
        a.length,
        b.length
    );

    return Math.round(
        (1 - distance / maxLength) * 100
    );
};


// ------------------------------------
// Fuzzy Search
// ------------------------------------

const fuzzySearch = (records, keyword) => {

    const searchKeyword = normalizeText(keyword);


    const fields = [
        "Name1",
        "Name2",
        "Village",
        "Name1_TA",
        "Name2_TA",
        "Village_TA"
    ];


    const results = [];


    for (const record of records) {

        let bestSimilarity = 0;
        let bestField = null;


        for (const field of fields) {

            const value = normalizeText(
                record[field]
            );

            if (!value) {
                continue;
            }


            // Direct similarity
            const similarity = similarityScore(
                searchKeyword,
                value
            );


            // Also check individual words
            const words = value.split(" ");

            for (const word of words) {

                const wordSimilarity = similarityScore(
                    searchKeyword,
                    word
                );

                if (wordSimilarity > bestSimilarity) {

                    bestSimilarity = wordSimilarity;
                    bestField = field;

                }
            }


            if (similarity > bestSimilarity) {

                bestSimilarity = similarity;
                bestField = field;

            }
        }


        // Keep reasonably strong matches
        if (bestSimilarity >= 70) {

            results.push({

                item: record,

                similarity: bestSimilarity,

                matchedField: bestField

            });

        }
    }


    // Highest similarity first

    results.sort(
        (a, b) =>
            b.similarity - a.similarity
    );


    return results;
};


module.exports = {
    fuzzySearch,
    normalizeText,
    levenshteinDistance,
    similarityScore
};