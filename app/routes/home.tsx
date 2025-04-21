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
    <div className="home-container">
      <h1 className="home-title">Tournament of Values</h1>
      <p className="home-subtext">
        Choose your core values through a series of one-on-one matchups. Each
        round helps you narrow down what truly matters most.
      </p>
      <button onClick={() => navigate("/round")}>Start</button>
    </div>
  );
}