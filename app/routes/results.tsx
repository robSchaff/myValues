// /app/routes/results.tsx
import { useLocation, useNavigate } from "react-router";
import { analyzeCategories } from "../utils/analyzeCategories";
import { appVersion } from "../lib/meta";



export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const topValues = location.state?.topValues || [];
  const { dominantCategories, categoryCounts } = analyzeCategories(topValues);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        ✨ Your Top Values ✨
      </h1>

      <ul className="text-lg text-gray-800 mb-8 space-y-2">
        {topValues.map((value, index) => (
          <li key={index} className="px-6 py-3 bg-white rounded shadow text-center w-64">
            {value}
          </li>
        ))}
      </ul>

      {dominantCategories.length > 0 && (
        <p className="text-sm text-gray-500 mt-6 mb-10">
        Your top values reflect a strong emphasis on{" "}
        <strong>{dominantCategories.join(" and ")}</strong>.
        </p>
      )}

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Start Over
      </button>

      <p className="text-sm text-gray-400 mt-6">Version {appVersion} · Swiss-style scoring</p>
    </div>
  );
}