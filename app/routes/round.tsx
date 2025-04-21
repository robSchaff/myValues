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

  useEffect(() => {
    if (round === 5 && finalists.length === 3) {
      navigate("/results", { state: { topValues: finalists } });
    }
  }, [round, finalists, navigate]);

  const handleSelect = (winner: string) => {
    const updatedNextRound = [...nextRoundValues, winner];

    if (pairIndex + 2 >= currentValues.length) {
      if (round === 4) {
        setFinalists([winner]);
        setRound(5);
        return;
      }

      setCurrentValues(updatedNextRound);
      setNextRoundValues([]);
      setPairIndex(0);
      setRound(round + 1);
    } else {
      setNextRoundValues(updatedNextRound);
      setPairIndex(pairIndex + 2);
    }
  };

  if (round === 5) {
    const finalFour = [...nextRoundValues, currentValues[pairIndex], currentValues[pairIndex + 1]];
    return (
      <div>
        <h2>Choose 2 more values for your Top 3</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {finalFour.map((value) => (
            <button
              key={value}
              onClick={() => {
                if (!finalists.includes(value)) {
                  const updated = [...finalists, value];
                  setFinalists(updated);
                  if (updated.length === 3) {
                    navigate("/results", { state: { topValues: updated } });
                  }
                }
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (pairIndex >= currentValues.length) return null;

  return (
    <div className="round-container">
      <h2>Round {round}: Which value matters more to you?</h2>
      <div className="button-pair">
        <button onClick={() => handleSelect(currentValues[pairIndex])}>
          {currentValues[pairIndex]}
        </button>
        <button onClick={() => handleSelect(currentValues[pairIndex + 1])}>
          {currentValues[pairIndex + 1]}
        </button>
      </div>
    </div>
  );
}