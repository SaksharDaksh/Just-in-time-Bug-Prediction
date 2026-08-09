import Navbar from "../components/Navbar";
import ResultSection from "../components/ResultSection";

export default function ResultsPage() {
  const result = JSON.parse(
    localStorage.getItem("analysisResult")
  );

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <ResultSection result={result} />
    </div>
  );
}