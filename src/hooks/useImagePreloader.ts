import { useState, useEffect } from "react";
import { ALPHABET, LETTER_VARIANTS, IMAGE_BASE_PATH } from "../utils/letters";

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [cachedImages, setCachedImages] = useState<{
    [key: string]: HTMLImageElement;
  }>({});
  const totalImages = ALPHABET.length * LETTER_VARIANTS.length;

  useEffect(() => {
    const preloadImages = () => {
      ALPHABET.forEach((letter) => {
        LETTER_VARIANTS.forEach((variant) => {
          const img = new Image();
          img.src = `${IMAGE_BASE_PATH}/${letter}${variant}.png`;
          img.onload = () => {
            setImagesLoaded((prev) => prev + 1);
            setCachedImages((prev) => ({
              ...prev,
              [`${letter}${variant}`]: img,
            }));
          };
        });
      });
    };

    preloadImages();
  }, []);

  return { imagesLoaded, totalImages, cachedImages };
};
