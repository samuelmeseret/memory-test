import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-blue-800 px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Memory Helper
        </h1>
        <p className="mx-auto mt-4 max-w-md text-2xl text-blue-100">
          Never forget a familiar face
        </p>
        <Link
          href="/login"
          className="mt-8 inline-flex h-16 items-center rounded-2xl bg-white px-10 text-xl font-bold text-blue-800 shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
        >
          Get Started
        </Link>
      </header>

      {/* How it works */}
      <main>
        <section className="mx-auto max-w-2xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            How It Works
          </h2>
          <div className="mt-10 space-y-8">
            {[
              {
                step: "1",
                title: "Add Photos",
                desc: "Add photos of your family members with their names.",
              },
              {
                step: "2",
                title: "Take a Photo",
                desc: "When you see someone familiar, take their photo.",
              },
              {
                step: "3",
                title: "Get a Match",
                desc: "We'll tell you who they are with a confidence score.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-800">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-lg text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white px-4 py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Designed for You
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Private", desc: "Your photos stay safe and only you can see them." },
                { title: "Simple", desc: "Large buttons, clear text, easy to use." },
                { title: "Helpful", desc: "Powered by AI to help you recognize loved ones." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-gray-50 p-6 text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-4 py-8 text-center text-lg text-gray-500">
        Memory Helper &mdash; Helping you remember the people you love.
      </footer>
    </div>
  );
}
