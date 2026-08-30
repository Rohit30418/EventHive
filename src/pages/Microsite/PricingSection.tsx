import React from "react";
import { Check, Sparkles, Star, Ticket } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

interface PricingSectionProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
    description: "For online viewers and first-time attendees.",
    features: [
      "Live stream access",
      "Digital event materials",
      "Community access",
      "Recorded sessions for 30 days",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "299",
    description: "Best for attendees who want the full event experience.",
    features: [
      "Full in-person access",
      "Networking sessions",
      "Workshop participation",
      "Recorded sessions lifetime access",
      "Lunch and refreshments",
      "Event swag pack",
    ],
    highlighted: true,
  },
  {
    name: "VIP",
    price: "799",
    description: "Premium access for serious networking and comfort.",
    features: [
      "Everything in Standard",
      "VIP seating and lounge",
      "Speaker dinner access",
      "1-on-1 mentorship sessions",
      "Priority networking",
      "Exclusive after-party",
      "Hotel discount code",
    ],
    highlighted: false,
  },
];

const hexToRgba = (hex: string, opacity: number): string => {
  const clean = hex?.replace("#", "");
  if (!clean || clean.length !== 6) return `rgba(79, 70, 229, ${opacity})`;

  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const PricingSection: React.FC<PricingSectionProps> = ({
  primaryColor = "#4F46E5",
  secondaryColor = "#06B6D4",
}) => {
  return (
    <section id="pricing" className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:py-28">
      <div
        className="absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{ backgroundColor: hexToRgba(secondaryColor, 0.14) }}
      />
      <div
        className="absolute -left-32 bottom-0 h-[34rem] w-[34rem] rounded-full blur-[130px]"
        style={{ backgroundColor: hexToRgba(primaryColor, 0.14) }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-sm"
            style={{ color: primaryColor }}
          >
            <Ticket size={14} />
            Ticket Options
          </span>

          <h2 className="mt-5 text-4xl font-black leading-tight  text-slate-950 sm:text-5xl">
            Choose the pass that fits your event experience.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Simple ticket plans for online attendees, in-person guests and VIP networking.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-transparent bg-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.25)]"
                  : "border-slate-200 bg-white text-slate-950 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
              }`}
            >
              {plan.highlighted && (
                <>
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      background: `radial-gradient(circle at top right, ${secondaryColor}, transparent 20rem), radial-gradient(circle at bottom left, ${primaryColor}, transparent 18rem)`,
                    }}
                  />
                  <div className="relative mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">
                    <Sparkles size={14} />
                    Most Popular
                  </div>
                </>
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">{plan.name}</h3>
                    <p className={`mt-2 text-sm leading-6 ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      plan.highlighted ? "bg-white/10 text-white" : "bg-slate-50"
                    }`}
                    style={!plan.highlighted ? { color: primaryColor } : undefined}
                  >
                    {plan.highlighted ? <Star size={21} fill="currentColor" /> : <Ticket size={21} />}
                  </div>
                </div>

                <div className="my-8">
                  <span className={`text-lg font-black ${plan.highlighted ? "text-slate-400" : "text-slate-400"}`}>₹</span>
                  <span className="text-6xl font-black ">{plan.price}</span>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                          plan.highlighted ? "bg-white/10 text-cyan-200" : "bg-slate-100"
                        }`}
                        style={!plan.highlighted ? { color: primaryColor } : undefined}
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className={`text-sm font-semibold leading-6 ${plan.highlighted ? "text-slate-200" : "text-slate-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-2xl px-5 py-4 text-sm font-black transition-all hover:-translate-y-0.5 ${
                    plan.highlighted ? "bg-white text-slate-950" : "text-white"
                  }`}
                  style={
                    plan.highlighted
                      ? undefined
                      : { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }
                  }
                >
                  Choose {plan.name}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;