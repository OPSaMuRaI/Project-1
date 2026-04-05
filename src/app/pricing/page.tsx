import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Try CreatorMind with limited generations.",
    features: [
      "AI training (niche, audience, tone)",
      "Personal content upload",
      "Competitor analysis (paste script)",
      "5 script generations / month",
      "30s & 60s duration",
    ],
    cta: "Get started",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/month",
    desc: "Unlimited scripts. For serious creators.",
    features: [
      "Everything in Free",
      "Unlimited script generations",
      "90s duration",
      "Viral, Educational, Storytelling modes",
      "Video transcript (competitor upload)",
      "Script history",
    ],
    cta: "Start free trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "Soon",
    period: "",
    desc: "Multiple AI profiles for agencies.",
    features: [
      "Everything in Creator",
      "Multiple creator profiles",
      "Team seats (coming later)",
    ],
    cta: "Notify me",
    href: "/signup",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-8 ${
              p.highlighted
                ? "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold">{p.price}</span>
              <span className="text-zinc-500">{p.period}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {p.desc}
            </p>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="text-violet-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-medium ${
                p.highlighted
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-zinc-500">
        Stripe integration coming later. Free and Creator plans available now.
      </p>
    </div>
  );
}
