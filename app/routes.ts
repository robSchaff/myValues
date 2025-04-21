import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("round", "routes/round.tsx"),
  route("results", "routes/results.tsx"),
];