import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your Personal AI That{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Writes Like You
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Train an AI on your niche, audience, and style. Generate
            high-retention scripts for Instagram Reels. One dashboard. Zero
            prompt engineering.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-violet-600 px-6 py-3 text-base font-medium text-white hover:bg-violet-700"
            >
              Start for free
            </Link>
            <Link
              href="/#how-it-works"
              className="rounded-full border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-b border-zinc-200 py-20 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Three steps to scripts that sound like you.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                1
              </span>
              <h3 className="mt-4 text-lg font-semibold">Set your brand</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Add your niche, target audience, content goal, and tone. Your AI
                learns how you want to sound.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                2
              </span>
              <h3 className="mt-4 text-lg font-semibold">Train on your content</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Upload your scripts, captions, and transcripts. Optionally add
                competitor reels so the AI learns structure and psychology.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                3
              </span>
              <h3 className="mt-4 text-lg font-semibold">Generate scripts</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Enter a video idea, pick duration and mode. Get a hook, body,
                and CTA tailored to your voice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-b border-zinc-200 py-20 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Features</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Built for creators who want AI that thinks like them.
          </p>
          <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Train on your niche, audience, and tone
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Upload your own scripts, captions, and transcripts
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Learn from competitors (structure + psychology only, no copying)
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Generate hook, body, and CTA in seconds
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Modes: Viral, Educational, Storytelling
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 text-violet-500">✓</span>
              Optional video transcript for competitor reels
            </li>
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-b border-zinc-200 py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Use Cases</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Who CreatorMind is for.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Instagram Reels creators", desc: "Scripts that keep viewers watching and tap-through." },
              { title: "YouTubers (shorts)", desc: "Fast hooks and clear CTAs for short-form." },
              { title: "Solopreneurs", desc: "Build a consistent personal brand voice." },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to write like you?</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Start with a free plan. Upgrade when you need unlimited scripts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-violet-600 px-6 py-3 text-base font-medium text-white hover:bg-violet-700"
            >
              Get started free
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-zinc-500">CreatorMind</span>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              Pricing
            </Link>
            <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
