import { Search, Mic, MicOff } from "lucide-react";


function SearchBar({
    keyword,
    setKeyword,
    onSearch,
    onVoiceSearch,
    isListening
}) {

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {

            onSearch();

        }

    };


    return (

        <div className="search-container">


            <div className="search-box">

                <Search size={22} />


                <input
                    type="text"
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="பெயர் / Name / Village"
                />


                <button
                    type="button"
                    className={
                        isListening
                            ? "voice-button listening"
                            : "voice-button"
                    }
                    onClick={onVoiceSearch}
                    title={
                        isListening
                            ? "Stop Voice Search"
                            : "Voice Search"
                    }
                >

                    {isListening ? (
                        <MicOff size={22} />
                    ) : (
                        <Mic size={22} />
                    )}

                </button>

            </div>


            <button
                type="button"
                className="search-button"
                onClick={onSearch}
            >

                <Search size={20} />

                தேடுக

            </button>

        </div>

    );
}


export default SearchBar;