import React, {useState, useEffect} from "react";
import {Card, CardContent} from "./components/ui/card";
import {Sun, Moon} from "lucide-react";

const LSFLearning = () => {
    const [currentLetter, setCurrentLetter] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : true;
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const preloadNextImages = (letter) => {
        const nextLetter = alphabet[(alphabet.indexOf(letter) + 1) % alphabet.length];
        const images = [
            `${nextLetter}.png`,
            `${nextLetter}_bis.png`
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = `/lsf-learning/images/alphabet/${src}`;
        });
    };

    const handleInteraction = () => {
        if (showAnswer) {
            setShowAnswer(false);
            preloadNextImages(currentLetter);
            generateRandomLetter();
        } else {
            setShowAnswer(true);
        }
    };

    const generateRandomLetter = () => {
        setIsLoading(true);
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        setCurrentLetter(alphabet[randomIndex]);
    };

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter") {
                handleInteraction();
            }
        };

        window.addEventListener("keypress", handleKeyPress);

        if (!currentLetter) {
            generateRandomLetter();
        }

        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        };
    }, [showAnswer, currentLetter]);

    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen p-4 touch-manipulation transition-colors duration-200 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
        >
            <h1
                className={`text-4xl sm:text-6xl font-bold mb-8 
              ${darkMode ? "text-white" : "text-gray-900"}`}
            >
                LSF Letter Learning
            </h1>
            <Card
                className={`w-full max-w-5xl min-h-[36rem] ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
            >
                <CardContent className="p-4 sm:p-8 h-full">
                    <div className="text-center h-full flex flex-col justify-center">
                        <div
                            className="relative mb-8 cursor-pointer"
                            onClick={handleInteraction}
                        >
                            <div
                                className={`text-7xl sm:text-9xl font-bold
                ${darkMode ? "text-white" : "text-gray-900"}`}
                            >
                                {currentLetter}
                            </div>
                        </div>

                        {currentLetter && (
                            <div
                                className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-8 cursor-pointer"
                                onClick={handleInteraction}
                            >
                                {[currentLetter, `${currentLetter}_bis`].map((src, index) => (
                                    <div key={src} className="relative">
                                        <div
                                            className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg transition-opacity duration-300 ${!showAnswer ? "opacity-100" : "opacity-0"}`}
                                        />
                                        <img
                                            loading="lazy"
                                            src={`/lsf/images/alphabet/${src}.png`}
                                            alt={`LSF sign for letter ${currentLetter} - View ${index + 1}`}
                                            className={`rounded-lg shadow-lg w-64 sm:w-80 h-64 sm:h-80 object-cover transition-all duration-300 ${!showAnswer ? "blur-2xl" : ""}`}
                                            onLoad={() => {
                                                if (index === 1) setIsLoading(false);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <p
                            className={`text-base sm:text-lg 
  ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                            Press Enter or tap anywhere to{" "}
                            {showAnswer ? "go to next letter" : "reveal the sign"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LSFLearning;
