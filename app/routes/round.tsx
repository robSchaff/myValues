// /app/routes/round.tsx
export default function Round() {
    const values = ["Transparency", "Security", "Wisdom", "Compassion"];
    const [index, setIndex] = useState(0);
    const [topValues, setTopValues] = useState<string[]>([]);
  
    const handleSelect = (winner: string) => {
      setTopValues(prev => [...prev, winner]);
      setIndex(index + 2);
    };
  
    if (index >= values.length) {
      return <Navigate to="/results" state={{ topValues }} />;
    }
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl mb-4">Which value matters more to you?</h2>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleSelect(values[index])}>{values[index]}</button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={() => handleSelect(values[index + 1])}>{values[index + 1]}</button>
        </div>
      </div>
    );
  }