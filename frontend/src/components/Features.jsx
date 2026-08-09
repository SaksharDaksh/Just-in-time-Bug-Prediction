import {
  Zap,
  Brain,
  GitPullRequest,
  ShieldCheck,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap size={42} />,
      title: "Fast Pull Request Analysis",
      desc: "Get a bug-risk score for a pull request in seconds, before you decide to merge it.",
    },
    {
      icon: <Brain size={42} />,
      title: "XGBoost Powered",
      desc: "Built using a high-performance machine learning model trained on real Apache commit history.",
    },
    {
      icon: <GitPullRequest size={42} />,
      title: "Real Diff Metrics",
      desc: "Analyzes the pull request's actual changed files, lines, and how scattered the change is-not just a repository average.",
    },
    {
      icon: <ShieldCheck size={42} />,
      title: "Explainable Merge Recommendation",
      desc: "See exactly why a PR was flagged risky via SHAP, plus a clear safe-to-merge or review-recommended call.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-950 py-32 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute right-0 top-0 w-125 h-125 bg-cyan-500/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Why Use Our Model?
          </h2>

          <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
            Built to help developers and maintainers know the risk
            of a pull request before it's merged not after.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                relative
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-8
                overflow-hidden
                hover:border-indigo-500
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <h3 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              72%
            </h3>
            <p className="text-gray-400 mt-3">
              Model Accuracy
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              XGBoost
            </h3>
            <p className="text-gray-400 mt-3">
              ML Model
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SHAP
            </h3>
            <p className="text-gray-400 mt-3">
              Explainable AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
