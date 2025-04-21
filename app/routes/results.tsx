// /app/routes/results.tsx
import { useLocation } from '@remix-run/react';

export default function Results() {
  const location = useLocation();
  const topValues = location.state?.topValues || [];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Top Values</h1>
      <ul className="list-disc list-inside">
        {topValues.map((val, idx) => (
          <li key={idx} className="text-lg">{val}</li>
        ))}
      </ul>
      <a href="/" className="mt-6 text-blue-600 underline">Start Over</a>
    </div>
  );
}