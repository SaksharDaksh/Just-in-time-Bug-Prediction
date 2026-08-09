export default function CTA() {
  return (
    <section className="bg-slate-950 py-28">
      <div className="max-w-5xl mx-auto px-6">

        <div className="rounded-3xl bg-linear-to-r from-indigo-600 to-cyan-500 p-16 text-center">

          <h2 className="text-5xl font-bold text-white">
            Ready To Analyze Your Repository?
          </h2>

          <p className="text-white/80 mt-6 text-lg">
            Detect bug-prone commits before they impact production.
          </p>

          <button className="mt-10 px-8 py-4 bg-white text-black rounded-xl font-bold hover:scale-105 transition">
            Analyze Now
          </button>

        </div>
      </div>
    </section>
  );
}