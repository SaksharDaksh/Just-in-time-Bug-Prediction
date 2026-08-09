export default function TechStack() {
  const tech = [
    "React",
    "Tailwind CSS",
    "Flask",
    "XGBoost",
    "SHAP",
    "GitHub API",
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold text-white">
          Built With
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-12">

          {tech.map((item) => (
            <div
              key={item}
              className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-white"
            >
              {item}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}