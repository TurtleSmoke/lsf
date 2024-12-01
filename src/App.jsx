import React, { useCallback, useState } from "react";
import { Card, CardContent } from "./components/lsf/LSFCard";
import { LSFImagePair } from "./components/lsf/LSFImagePair";
import { LSFLoadingState } from "./components/lsf/LSFLoadingState";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { ALPHABET } from "./utils/letters";

const App = () => {
  const [currentLetter, setCurrentLetter] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const { imagesLoaded, totalImages, cachedImages } = useImagePreloader();

  const generateRandomLetter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    setCurrentLetter(ALPHABET[randomIndex]);
  }, []);

  const handleInteraction = useCallback(() => {
    if (showAnswer) {
      setShowAnswer(false);
      generateRandomLetter();
    } else {
      setShowAnswer(true);
    }
  }, [showAnswer, generateRandomLetter]);

  useKeyboardNavigation(handleInteraction);

  // Initialize first letter
  React.useEffect(() => {
    if (!currentLetter) {
      generateRandomLetter();
    }
  }, [currentLetter, generateRandomLetter]);

  if (imagesLoaded < totalImages) {
    return <LSFLoadingState progress={(imagesLoaded / totalImages) * 100} />;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 touch-manipulation bg-gray-900`}
    >
      <h1 className={`text-3xl sm:text-5xl font-bold mb-4 text-white`}>
        LSF Alphabet
      </h1>
      <Card className={`w-full max-h-[80vh] bg-gray-800 border-gray-700`}>
        <CardContent className="p-4 sm:p-8">
          <div className="text-center flex flex-col justify-center gap-8">
            <div className="cursor-pointer" onClick={handleInteraction}>
              <div className={`text-6xl sm:text-8xl font-bold text-white`}>
                {currentLetter}
              </div>
            </div>

            {currentLetter && (
              <LSFImagePair
                letter={currentLetter}
                showAnswer={showAnswer}
                onClick={handleInteraction}
                cachedImages={cachedImages}
              />
            )}

            <p className={`text-base sm:text-lg text-gray-300`}>
              Press Enter or tap anywhere to{" "}
              {showAnswer ? "go to next letter" : "reveal the sign"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
