export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Paste Pull Request URL",
      description:
        "Enter a GitHub pull request link the one you're deciding whether to merge.",
      icon: "🔗",
    },
    {
      number: "02",
      title: "Extract Diff Metrics",
      description:
        "The app pulls the PR's real file changes: lines added/deleted, files, directories, and subsystems touched.",
      icon: "📊",
    },
    {
      number: "03",
      title: "Run XGBoost + SHAP",
      description:
        "The trained model scores bug risk, and SHAP surfaces which changes are driving that score.",
      icon: "🤖",
    },
    {
      number: "04",
      title: "Get a Merge Recommendation",
      description:
        "See the risk level and a clear safe-to-merge or review-recommended call, with a link straight to the PR.",
      icon: "✅",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-slate-950 py-32 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-175 bg-indigo-500/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-gray-400 mt-6 text-lg">
            From pull request link to merge recommendation in seconds.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="
                relative
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                min-h-80
                hover:border-indigo-500
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Number */}
              <div className="absolute top-5 left-5 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg font-bold">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-6xl mt-16 mb-8">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-white text-2xl font-bold mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Gradient Glow */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-indigo-500/0 to-cyan-500/0 hover:from-indigo-500/10 hover:to-cyan-500/10 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
