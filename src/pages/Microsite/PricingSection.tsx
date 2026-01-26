import React from "react";
import { Check, Star } from "lucide-react";

// 1. Define the interface for a single pricing plan
interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

// 2. Define the props for the component
interface PricingSectionProps {
  primaryColor?: string; 
  secondaryColor?: string; // Added secondary color for gradients
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for curious minds",
    features: [
      "Live stream access",
      "Digital event materials",
      "Community access",
      "Recorded sessions (30 days)",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    price: "299",
    description: "Most popular choice",
    features: [
      "Full in-person access",
      "All networking events",
      "Workshop participation",
      "Recorded sessions (lifetime)",
      "Lunch & refreshments",
      "Event swag pack",
    ],
    highlighted: true,
  },
  {
    name: "VIP",
    price: "799",
    description: "For the ultimate experience",
    features: [
      "Everything in Standard",
      "VIP seating & lounge",
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
  primaryColor = "#4F46E5", 
  secondaryColor = "#9333ea" 
}) => {
  
  // Helper to create transparent versions of the primary color
  const hexToRgba = (hex: string, opacity: number): string => {
    if (!hex) return `rgba(79, 70, 229, ${opacity})`;
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <section id="pricing" className="py-24 relative bg-slate-50 overflow-hidden">
      
      {/* Background Mesh Gradient (Matches Parent Page) */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none mix-blend-multiply"
        style={{ backgroundColor: secondaryColor }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none mix-blend-multiply"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span 
            className="font-bold text-sm uppercase tracking-widest mb-3 block"
            style={{ color: primaryColor }}
          >
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}>Experience</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Select the perfect ticket for your needs. All plans include core event access and digital materials.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative group rounded-[2rem] transition-all duration-500 ${
                plan.highlighted 
                  ? 'bg-white shadow-2xl scale-105 z-10 ring-1 ring-slate-200' 
                  : 'bg-white/60 backdrop-blur-md shadow-lg border border-white hover:-translate-y-2'
              }`}
            >
              
              {/* Highlighted Gradient Border Effect */}
              {plan.highlighted && (
                <div 
                    className="absolute inset-0 rounded-[2rem] opacity-20 pointer-events-none" 
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` }}
                />
              )}

              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <div 
                    className="flex items-center gap-1.5 px-6 py-2 rounded-full shadow-lg shadow-indigo-500/20"
                    style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
                  >
                    <Star size={14} className="text-white fill-current animate-[spin_3s_linear_infinite]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="p-8 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-slate-400 text-lg font-medium">$</span>
                    <span 
                      className="text-5xl font-black tracking-tighter text-slate-900"
                    >
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100 mb-8"></div>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: hexToRgba(plan.highlighted ? primaryColor : "#64748b", 0.1) }}
                      >
                        <Check size={12} style={{ color: plan.highlighted ? primaryColor : "#64748b" }} strokeWidth={3} />
                      </div>
                      <span className="text-slate-600 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg group-hover:shadow-xl ${
                    plan.highlighted 
                      ? 'text-white hover:brightness-110' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                  style={plan.highlighted ? { backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` } : {}}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-400 text-sm mt-16">
          Prices in USD. Need a team pass?{" "}
          <a href="#" className="font-bold hover:underline decoration-2 underline-offset-2" style={{ color: primaryColor }}>
            Contact Sales
          </a>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;