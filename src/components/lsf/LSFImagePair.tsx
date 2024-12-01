import React from "react";
import { IMAGE_BASE_PATH, LETTER_VARIANTS } from "../../utils/letters";

interface LSFImagePairProps {
  letter: string;
  showAnswer: boolean;
  onClick: () => void;
  cachedImages: { [key: string]: HTMLImageElement };
}

export const LSFImagePair: React.FC<LSFImagePairProps> = ({
  letter,
  showAnswer,
  onClick,
  cachedImages = {},
}) => {
  return (
    <>
      <div className="hidden">
        {LETTER_VARIANTS.map((variant) => (
          <img
            key={`preload-${variant}`}
            src={`${IMAGE_BASE_PATH}/${letter}${variant}.png`}
            alt=""
          />
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 cursor-pointer"
        onClick={onClick}
      >
        {LETTER_VARIANTS.map((variant, index) => (
          <div
            key={variant}
            className="relative w-[30vh] sm:w-[35vh] h-[30vh] sm:h-[35vh]"
          >
            <img
              src={`${IMAGE_BASE_PATH}/${letter}${variant}.png`}
              alt={`LSF sign for letter ${letter} - View ${index + 1}`}
              className={`w-full h-full rounded-lg shadow-lg object-cover ${!showAnswer ? "opacity-20 blur-2xl" : "opacity-100 blur-0 transition-all duration-150"}`}
              style={{ willChange: "filter" }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
