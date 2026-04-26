import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import NotesPage from "./pages/NotesPage";
import StatsPage from "./pages/StatsPage";
import ProductivityPage from "./pages/ProductivityPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/productivity" element={<ProductivityPage />} />
      </Routes>
    </BrowserRouter>
  );
}
