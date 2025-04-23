import { useEffect, useState } from "react";
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

interface Match {
  a: string;
  b: string;
}

export default function RoundSwiss() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  // Generate matches on mount
  useEffect(() => {
    const generateMatches = (values: string[], appearances = 3): Match[] => {
      const matchList: Match[] = [];
      const count: Record<string, number> = Object.fromEntries(values.map(v => [v, 0]));

      while (Object.values(count).some(c => c < appearances)) {
        const available = values.filter(v => count[v] < appearances);
        const [a, b] = shuffle(available).slice(0, 2);
        matchList.push({ a, b });
        count[a]++;
        count[b]++;
      }

      return shuffle(matchList);
    };

    setMatches(generateMatches(shuffle(importedValues), 3));
    }, []);

  const handleSelect = (winner: string) => {
    setScores(prev => ({
      ...prev,
      [winner]: (prev[winner] || 0) + 1
    }));

    if (currentMatchIndex + 1 >= matches.length) {
      // Done: compute top 3 and navigate
      const finalScores = {
        ...scores,
        [winner]: (scores[winner] || 0) + 1,
      };

      const topValues = Object.entries(finalScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4) // change to 3 if you prefer
        .map(([val]) => val);

      navigate("/results", { state: { topValues } });
    } else {
      setCurrentMatchIndex(i => i + 1);
    }
  };

  if (!matches.length) return <div className="text-center p-8">Loading...</div>;

  const { a, b } = matches[currentMatchIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h2 className="text-xl text-gray-500 mb-1">
        Match {currentMatchIndex + 1} of {matches.length}
      </h2>
      <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
        Which value feels more true to you?
      </h3>

      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-4">
        <button
          className="w-60 px-6 py-4 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 hover:scale-105 transform transition"
          onClick={() => handleSelect(a)}
        >
          {a}
        </button>
        <button
          className="w-60 px-6 py-4 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 hover:scale-105 transform transition"
          onClick={() => handleSelect(b)}
        >
          {b}
        </button>
      </div>
    </div>
  );
}