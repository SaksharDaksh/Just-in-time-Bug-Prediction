import { Link } from "react-router-dom";
import { Bug } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <Bug size={32} className="text-indigo-500" />
          <h1 className="text-white text-2xl font-bold">
            JIT Bug Prediction
          </h1>
        </Link>

        <div className="flex gap-8 text-white font-medium">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/features">Features</Link>
          <Link to="/about">About</Link>
        </div>

      </div>
    </nav>
  );
}