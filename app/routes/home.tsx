import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
        Tournament of Values
      </h1>
      <p className="text-lg text-gray-700 max-w-md text-center mb-8">
        Choose your core values through a series of one-on-one matchups. Each round helps you reflect
        and refine what truly matters to you.
      </p>

      <a
        href="/round"
        className="block px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition mb-4 text-center"
      >
        Classic Bracket
      </a>

      <a
        href="/round-swiss"
        className="block px-6 py-3 text-white bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition text-center"
      >
        Swiss Style
      </a>
    </div>
  );
}

//      <button
//        onClick={() => navigate("/round")}
//        className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition mb-4"
//      >
//</div>        Classic Bracket
//      </button>
//
//     <button
//        onClick={() => navigate("/round-swiss")}
//        className="px-6 py-3 text-white bg-purple-600 rounded-lg shadow hover:bg-purple-700 transition"
//      >
//        Swiss Style
//      </button>