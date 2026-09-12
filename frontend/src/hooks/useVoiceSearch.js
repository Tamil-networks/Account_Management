import { useEffect, useRef, useState } from "react";

const useVoiceSearch = (onResult) => {

    const recognitionRef = useRef(null);

    const [isListening, setIsListening] = useState(false);

    const [language, setLanguage] = useState("ta-IN");

    const [error, setError] = useState("");


    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            setError(
                "இந்த உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை"
            );

            return;
        }


        const recognition = new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = false;

        recognition.maxAlternatives = 1;

        recognition.lang = language;


        recognition.onstart = () => {

            setIsListening(true);

            setError("");

        };


        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            onResult(transcript);

        };


        recognition.onerror = (event) => {

            console.error(
                "Speech recognition error:",
                event.error
            );


            if (event.error === "not-allowed") {

                setError(
                    "மைக்ரோஃபோன் அனுமதி வழங்கப்படவில்லை"
                );

            } else if (event.error === "no-speech") {

                setError(
                    "குரல் கண்டறியப்படவில்லை"
                );

            } else {

                setError(
                    "குரல் தேடலில் பிழை ஏற்பட்டது"
                );

            }

        };


        recognition.onend = () => {

            setIsListening(false);

        };


        recognitionRef.current = recognition;


        return () => {

            recognition.stop();

        };

    }, [language, onResult]);


    const startListening = () => {

        if (!recognitionRef.current) {

            setError(
                "Voice search is not supported"
            );

            return;
        }


        try {

            recognitionRef.current.start();

        } catch (error) {

            console.log(
                "Recognition already running"
            );

        }

    };


    const stopListening = () => {

        if (recognitionRef.current) {

            recognitionRef.current.stop();

        }

    };


    return {

        isListening,

        language,

        setLanguage,

        error,

        startListening,

        stopListening

    };
};


export default useVoiceSearch;