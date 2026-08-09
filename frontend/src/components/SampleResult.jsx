export default function SampleResult() {
  return (
    <section className="bg-slate-950 py-28">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            Example Analysis
          </h2>

          <p className="text-gray-400 mt-4">
            Here's what a prediction report looks like.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <div className="flex flex-col md:flex-row justify-between gap-10">

            <div>
              <p className="text-gray-400">
                Repository
              </p>

              <h3 className="text-3xl font-bold text-white mt-2">
                facebook/react
              </h3>

              <div className="mt-8">
                <p className="text-gray-400">
                  Bug Probability
                </p>

                <h2 className="text-7xl font-black text-red-500 mt-2">
                  82%
                </h2>
              </div>
            </div>

            <div>
              <p className="text-gray-400">
                Risk Level
              </p>

              <div className="mt-3 inline-block px-5 py-2 rounded-full bg-red-500/20 text-red-400 font-semibold">
                HIGH RISK
              </div>

              <div className="mt-8">
                <p className="text-gray-400 mb-4">
                  Major Risk Factors
                </p>

                <div className="space-y-3 text-white">
                  <p>✓ High Code Churn</p>
                  <p>✓ Large Commit Size</p>
                  <p>✓ Multiple Developers</p>
                  <p>✓ High File Change Count</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}