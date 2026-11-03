import React from "react";
import { Check, Sparkles, Ticket } from "lucide-react";

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

const PricingSection: React.FC<PricingSectionProps> = ({
  primaryColor = "#F26B2A",
  secondaryColor = "#E88A54",
}) => {
  return (
    <section id="pricing" className="eh-ms-section bg-white">
      <div className="eh-ms-container">
        <div className="eh-ms-section-heading">
          <span
            className="eh-ms-eyebrow inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2"
            style={{ color: primaryColor }}
          >
            <Ticket size={14} />
            Ticket Options
          </span>
          <h2 className="eh-ms-heading mt-5 text-slate-950">
            Choose the pass that fits your event experience.
          </h2>
          <p className="eh-ms-copy">
            Simple ticket plans for online attendees, in-person guests and VIP networking.
          </p>
        </div>

        <div className="eh-ms-pricing">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`eh-ms-pricing-card eh-ms-card ${plan.highlighted ? "is-highlighted" : ""}`}
              style={plan.highlighted ? { borderColor: primaryColor } : undefined}
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <h3 className="text-2xl font-bold text-slate-950">{plan.name}</h3>
                {plan.highlighted ? (
                  <span
                    className="eh-ms-eyebrow inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    <Sparkles size={13} />
                    Most Popular
                  </span>
                ) : (
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-50" style={{ color: primaryColor }}>
                    <Ticket size={21} />
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-1 text-slate-950">
                <span className="text-xl font-bold">₹</span>
                <span className="break-words text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-tight">{plan.price}</span>
              </div>

              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {plan.description}
              </p>

              <ul className="eh-ms-pricing-features space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-100" style={{ color: primaryColor }}>
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="min-w-0 text-base leading-relaxed text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="eh-ms-price-action rounded-xl px-5 py-3 font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
              >
                Choose {plan.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;