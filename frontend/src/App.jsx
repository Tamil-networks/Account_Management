import { useState, useCallback } from "react";

import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";

import { searchAccounts } from "./services/searchService";

import useVoiceSearch from "./hooks/useVoiceSearch";

import "./styles/home.css";


function App() {

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================
    // Search
    // =====================================

    const handleSearch = async (searchKeyword = keyword) => {

        if (!searchKeyword || !searchKeyword.trim()) {

            setMessage(
                "தயவுசெய்து தேடல் வார்த்தையை உள்ளிடவும்"
            );

            setResults([]);

            return;
        }


        try {

            setLoading(true);

            setMessage("");

            setResults([]);


            const data = await searchAccounts(
                searchKeyword.trim()
            );


            setResults(data.results);


            if (data.type === "fuzzy") {

                setMessage(
                    `${data.count} முடிவு கிடைத்தது. ` +
                    `எழுத்துப்பிழை திருத்தத்துடன் தேடப்பட்டது.`
                );

            } else {

                setMessage(
                    `${data.count} முடிவு கிடைத்தது`
                );

            }

        } catch (error) {

            console.error(
                "Search error:",
                error
            );


            setResults([]);


            if (
                error.response &&
                error.response.status === 404
            ) {

                setMessage(
                    "கணக்கு விவரம் கிடைக்கவில்லை"
                );

            } else if (
                error.response?.data?.message
            ) {

                setMessage(
                    error.response.data.message
                );

            } else {

                setMessage(
                    "சேவையகத்துடன் இணைக்க முடியவில்லை"
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // =====================================
    // Voice Search Result
    // =====================================

    const handleVoiceResult = useCallback(
        (text) => {

            setKeyword(text);

            // Automatically search
            handleSearch(text);

        },
        []
    );


    // =====================================
    // Voice Search Hook
    // =====================================

    const {
        isListening,
        language,
        setLanguage,
        error: voiceError,
        startListening,
        stopListening
    } = useVoiceSearch(handleVoiceResult);


    // =====================================
    // UI
    // =====================================

    return (

        <div className="app">


            {/* Header */}

            <header className="header">

                <h1>
                    MOI ACCOUNT
                </h1>

                <h2>
                    MANAGEMENT
                </h2>

                <p>
                    கணக்கு விவரங்களை தேடுங்கள்
                </p>

            </header>


            {/* Main */}

            <main className="main">


                {/* Voice Language */}

                <div className="language-selector">

                    <label>
                        குரல் மொழி:
                    </label>

                    <select
                        value={language}
                        onChange={(e) =>
                            setLanguage(e.target.value)
                        }
                    >

                        <option value="ta-IN">
                            தமிழ்
                        </option>

                        <option value="en-IN">
                            English
                        </option>

                    </select>

                </div>


                {/* Search */}

                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    onSearch={handleSearch}
                    onVoiceSearch={
                        isListening
                            ? stopListening
                            : startListening
                    }
                    isListening={isListening}
                />


                {/* Voice Listening */}

                {isListening && (

                    <div className="voice-status">

                        🎤 கேட்கிறது... பேசுங்கள்

                    </div>

                )}


                {/* Voice Error */}

                {voiceError && (

                    <div className="voice-error">

                        {voiceError}

                    </div>

                )}


                {/* Loading */}

                {loading && (

                   <div className="loading-box">

                         <div className="loading-spinner"></div>

                         <span>
                             கணக்கு விவரங்களை தேடுகிறது...
                         </span>

                    </div>

                )}


                {/* Message */}

                {!loading && message && (

                    <div className="status">

                        {message}

                    </div>

                )}


               {/* =====================================
                   Results
                   ===================================== */}

                {!loading && results.length > 0 && (

                     <section className="results">

                        {/* Results Header */}

                        <div className="results-header">

                            <div>

                               <h2>
                                  தேடல் முடிவுகள்
                               </h2>

                               <p>
                                  கண்டறியப்பட்ட கணக்குகள்
                               </p>

                            </div>


                            <div className="result-count">

                               {results.length}

                               <span>
                                  முடிவுகள்
                               </span>

                            </div>

                        </div>


                        {/* Result Cards */}

                        <div className="results-list">

                          {results.map(
                              (account, index) => (

                                 <ResultCard
                                     key={index}
                                     account={account}
                                 />

                              )
                           )}

                    </div>

        </section>

)}
               {/* =====================================
                    No Results
                   ===================================== */}

                {!loading &&
                    keyword.trim() !== "" &&
                    results.length === 0 &&
                    message && (

                    <div className="no-results">

                       <div className="no-results-icon">
            🔍
                       </div>

                       <h2>
                            கணக்கு விவரம் கிடைக்கவில்லை
                       </h2>

                      <p>
                          "{keyword}" என்ற தேடலுக்கு
                          பொருத்தமான கணக்கு கிடைக்கவில்லை.
                      </p>

                      <span>
                            பெயர் அல்லது ஊர் பெயரை
                            சரிபார்த்து மீண்டும் முயற்சிக்கவும்.
                      </span>

                    </div>

               )}

            </main>


            {/* Footer */}

            <footer className="footer">

                <p>
                    Moi Account Management
                </p>

            </footer>

        </div>

    );
}


export default App;