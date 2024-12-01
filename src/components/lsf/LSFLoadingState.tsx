import React from "react";

interface LSFLoadingStateProps {
  progress: number;
}

export const LSFLoadingState: React.FC<LSFLoadingStateProps> = ({
  progress,
}) => (
  <div
    className={`flex flex-col items-center justify-center h-screen p-4 bg-gray-900 text-white"`}
  >
    <h2 className="text-2xl font-bold mb-4">Loading Images...</h2>
    <p>{Math.round(progress)}%</p>
  </div>
);
