import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 px-6 py-24 text-center text-white sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Memory Helper
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-2xl font-medium leading-relaxed text-indigo-100">
            Never forget a familiar face again.
          </p>
          <Link
            href="/login"
            className="mt-10 inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-xl font-bold text-indigo-700 shadow-xl shadow-indigo-900/20 ring-1 ring-white/50 transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        {/* How it works */}
        <section className="mx-auto max-w-2xl px-6 py-20 sm:py-24">
          <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900">
            How It Works
          </h2>
          <div className="mt-14 space-y-10">
            {[
              {
                step: "1",
                title: "Add Photos",
                desc: "Upload clear photos of your family members and enter their names.",
              },
              {
                step: "2",
                title: "Take a Photo",
                desc: "Whenever you see someone familiar, simply snap a picture.",
              },
              {
                step: "3",
                title: "Get a Match",
                desc: "We will gently remind you who they are, so you can feel confident.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col sm:flex-row gap-6 sm:items-start items-center text-center sm:text-left rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-inner">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xl leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white px-6 py-20 sm:py-24 border-t border-slate-100">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900">
              Designed for You
            </h2>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {[
                { title: "Private", desc: "Your photos stay completely safe and only you can see them." },
                { title: "Simple", desc: "Large buttons and clear text make it incredibly easy to use." },
                { title: "Helpful", desc: "Powered by modern technology to safely recognize your loved ones." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50 p-8 text-center ring-1 ring-slate-200/60 transition-transform hover:-translate-y-1"
                >
                  <h3 className="text-2xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-xl leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-6 py-10 text-center text-lg text-slate-500">
        <p>Memory Helper &mdash; Helping you remember the people you love.</p>
      </footer>
    </div>
  );
}
