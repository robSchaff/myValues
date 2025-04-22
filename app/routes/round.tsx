import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { values as importedValues } from "../lib/values";

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Round() {
  const navigate = useNavigate();
  const [round, setRound] = useState(1);
  const [pairIndex, setPairIndex] = useState(0);
  const [currentValues, setCurrentValues] = useState(() => shuffle(importedValues));
  const [nextRoundValues, setNextRoundValues] = useState<string[]>([]);
  const [finalists, setFinalists] = useState<string[]>([]);

  const handleSelect = (winner: string) => {
    const updatedNextRound = [...nextRoundValues, winner];
  
    if (pairIndex + 2 >= currentValues.length) {
      // End of current round
      if (currentValues.length === 4) {
        // We are down to the final 4 → navigate to results
        const finalFour = [...updatedNextRound];
        navigate("/results", { state: { topValues: finalFour } });
        return;
      }
  
      // Prepare next round
      setCurrentValues(updatedNextRound);
      setNextRoundValues([]);
      setPairIndex(0);
      setRound(round + 1);
    } else {
      setNextRoundValues(updatedNextRound);
      setPairIndex(pairIndex + 2);
    }
  };

  if (pairIndex >= currentValues.length) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        Round {round}: Which value matters more to you?
      </h2>

      <div
        key={pairIndex} // 👈 ensures re-render when pair changes
        className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-4"
      >
        <button
          className="w-60 px-6 py-4 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 hover:scale-105 transform transition duration-150 ease-in-out"
          onClick={() => handleSelect(currentValues[pairIndex])}
        >
          {currentValues[pairIndex]}
        </button>
        <button
          className="w-60 px-6 py-4 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 hover:scale-105 transform transition duration-150 ease-in-out"
          onClick={() => handleSelect(currentValues[pairIndex + 1])}
        >
          {currentValues[pairIndex + 1]}
        </button>
      </div>
    </div>
  );
}