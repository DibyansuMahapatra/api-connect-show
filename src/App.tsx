import { Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { DeveloperPage } from "./components/DeveloperPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/developer" element={<DeveloperPage/>} />
    </Routes>
  );
}