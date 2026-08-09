import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Target,
  Database,
  GitBranch,
  GitPullRequest,
  Brain,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Commits Analyzed", value: "106,674" },
    { label: "Apache Projects", value: "14" },
    { label: "Models Trained", value: "3" },
    { label: "Best ROC-AUC", value: "0.81" },
  ];

  const modelResults = [
    {
      name: "Logistic Regression",
      role: "Baseline",
      accuracy: "69.24%",
      recall: "68.64%",
      f1: "42.19%",
      auc: "0.7612",
    },
    {
      name: "Random Forest",
      role: "Highest Recall",
      accuracy: "68.18%",
      recall: "80.97%",
      f1: "45.43%",
      auc: "0.8084",
    },
    {
      name: "XGBoost",
      role: "Deployed Model",
      accuracy: "72.16%",
      recall: "74.23%",
      f1: "46.59%",
      auc: "0.8031",
      highlight: true,
    },
  ];

  const pipeline = [
    {
      icon: Database,
      title: "Dataset",
      text: "Trained on ApacheJIT : 106,674 commits across 14 Apache open-source projects (2003–2019), with commit-level code, historical, and developer-experience metrics.",
    },
    {
      icon: GitBranch,
      title: "Preprocessing",
      text: "Chronological train/test split, SMOTE oversampling for class imbalance, and feature scaling , all applied without leaking future data into training.",
    },
    {
      icon: Brain,
      title: "Modeling",
      text: "Logistic Regression, Random Forest, and XGBoost were trained and compared. XGBoost was selected for deployment for its balance of accuracy, precision, and F1 score.",
    },
    {
      icon: Sparkles,
      title: "Explainability",
      text: "SHAP is used to surface the top features behind every prediction, so results aren't just a risk score, they come with a reason.",
    },
  ];

  const team = [
    { name: "Parv Chaturvedi", id: "BTECH/10408/23" },
    { name: "Sakshar Daksh", id: "BTECH/10422/23" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            About The Project
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            Just-In-Time Bug Prediction analyzes a pull request before
            it's merged using machine learning trained on real-world
            Apache software history, so risky changes can be caught
            at the exact moment someone is deciding whether to merge.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl py-6 text-center"
              >
                <div className="text-3xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-indigo-400" size={28} />
              <h2 className="text-white text-3xl font-bold">
                The Problem
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Traditional defect prediction operates at the file or
              module level and often flags risk too late after code
              has already reached the main branch. Just-In-Time
              prediction instead evaluates a pull request at the exact
              moment it's proposed, using the size and shape of its
              diff, so a repository owner can decide whether to merge
              with a clear sense of the risk, rather than finding out
              after the fact.
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-white text-3xl font-bold text-center mb-12">
            How It Was Built
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {pipeline.map((step) => (
              <div
                key={step.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <step.icon className="text-indigo-400 mb-4" size={26} />
                <h3 className="text-white text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live application */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <GitPullRequest className="text-indigo-400" size={28} />
              <h2 className="text-white text-3xl font-bold">
                From Pull Request to Merge Decision
              </h2>
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              The deployed app doesn't just analyze a repository in
              general, it studies one specific pull request. Paste
              its GitHub link, and the app fetches that PR's real
              diff (lines changed, files touched, how scattered the
              change is), runs it through XGBoost, and returns a risk
              level along with the features driving it.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                <p className="text-green-400 font-semibold mb-1">
                  Low / No Risk
                </p>
                <p className="text-gray-400 text-sm">
                  The app flags the PR as safe to merge, and links
                  straight to it on GitHub.
                </p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
                <p className="text-yellow-400 font-semibold mb-1">
                  Medium / High Risk
                </p>
                <p className="text-gray-400 text-sm">
                  The app recommends review before merging, and shows
                  which features drove the risk score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model comparison */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-white text-3xl font-bold text-center mb-4">
            Model Performance
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Three models were trained and compared on the same
            time-aware split of the ApacheJIT dataset.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wide">
                    <th className="px-6 py-4 font-medium">Model</th>
                    <th className="px-6 py-4 font-medium">Accuracy</th>
                    <th className="px-6 py-4 font-medium">Recall</th>
                    <th className="px-6 py-4 font-medium">F1 Score</th>
                    <th className="px-6 py-4 font-medium">ROC-AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {modelResults.map((m) => (
                    <tr
                      key={m.name}
                      className={`border-b border-white/5 last:border-0 ${
                        m.highlight ? "bg-indigo-500/10" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-white font-semibold">
                          {m.name}
                        </div>
                        <div
                          className={`text-xs mt-0.5 ${
                            m.highlight
                              ? "text-indigo-400"
                              : "text-gray-500"
                          }`}
                        >
                          {m.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {m.accuracy}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {m.recall}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {m.f1}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {m.auc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-gray-500 text-sm text-center mt-4">
            XGBoost was selected for deployment for its balance of
            accuracy, precision, and F1 score across the evaluated models.
          </p>
        </div>
      </section>

      {/* Team & supervisor */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-indigo-400" size={28} />
              <h2 className="text-white text-3xl font-bold">
                The Team
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                >
                  <div className="text-white font-semibold text-lg">
                    {member.name}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-400 leading-relaxed">
              This project was carried out as a 2-Credit Summer
              Research Project in the Department of Computer Science
              &amp; Engineering, Birla Institute of Technology, Mesra,
              under the supervision of{" "}
              <span className="text-white font-medium">
                Dr. Kumar Rajnish
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
