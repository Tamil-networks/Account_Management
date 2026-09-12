const db = require("../config/database");

const {
    fuzzySearch,
    normalizeText
} = require("../services/fuzzySearchService");


const searchAccounts = async (req, res) => {

    try {

        // Get search keyword
        const q = req.query.q;


        // Validate input
        if (!q || typeof q !== "string" || q.trim() === "") {

            return res.status(400).json({
                success: false,
                message: "Search keyword is required"
            });

        }


        // Normalize keyword
        const keyword = normalizeText(q);


        // Prevent extremely short searches
        if (keyword.length < 2) {

            return res.status(400).json({
                success: false,
                message: "Please enter at least 2 characters"
            });

        }


        const searchValue = `%${keyword}%`;


        // --------------------------------
        // 1. NORMAL DATABASE SEARCH
        // --------------------------------

        const sql = `
            SELECT
                Name1,
                Name2,
                Village,
                Ammount,
                Tick,
                Extra_Ammount,
                Name1_TA,
                Name2_TA,
                Village_TA
            FROM moi_account
            WHERE
                Name1 LIKE ?
                OR Name2 LIKE ?
                OR Village LIKE ?
                OR Name1_TA LIKE ?
                OR Name2_TA LIKE ?
                OR Village_TA LIKE ?
            LIMIT 50
        `;


        const [rows] = await db.query(sql, [
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue,
            searchValue
        ]);


        // --------------------------------
        // NORMAL RESULTS FOUND
        // --------------------------------

        if (rows.length > 0) {

            return res.json({

                success: true,

                search: keyword,

                type: "normal",

                count: rows.length,

                results: rows

            });

        }


        // --------------------------------
        // 2. FUZZY SEARCH
        // --------------------------------

        const [allRecords] = await db.query(`
            SELECT
                Name1,
                Name2,
                Village,
                Ammount,
                Tick,
                Extra_Ammount,
                Name1_TA,
                Name2_TA,
                Village_TA
            FROM moi_account
        `);


       const fuzzyResults = fuzzySearch(
         allRecords,
         keyword
       );


      const results = fuzzyResults
        .slice(0, 20)
        .map(item => ({

            ...item.item,

            similarity: item.similarity,

            matchedField: item.matchedField

        }));


        // --------------------------------
        // FUZZY RESULTS FOUND
        // --------------------------------

        if (results.length > 0) {

            return res.json({

                success: true,

                search: keyword,

                type: "fuzzy",

                count: results.length,

                results: results

            });

        }


        // --------------------------------
        // NO RESULTS
        // --------------------------------

        return res.status(404).json({

            success: false,

            search: keyword,

            type: "none",

            count: 0,

            results: [],

            message: "No matching account found"

        });


    } catch (error) {

        console.error("Search error:", error);


        return res.status(500).json({

            success: false,

            message: "Search failed"

        });

    }

};


module.exports = {
    searchAccounts
};