import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Tournament of Values</h1>
      <p className="mb-6 text-center max-w-md">Choose your core values through a series of one-on-one matchups.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/round')}>Start</button>
    </div>
  );
}
