export default function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <h3 className="text-white font-bold">
          JIT Bug Prediction
        </h3>

        <p className="text-gray-500 mt-4 md:mt-0">
          Built using React, Flask, XGBoost and SHAP
        </p>

      </div>
    </footer>
  );
}