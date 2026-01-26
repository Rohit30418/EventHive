import React from "react";

const featuresarray = [
  {
    icon: "fa-calendar-plus",
    title: "Create Events Easily",
    desc: "Beautiful UI to publish events fast. Drag-and-drop builder, templates, and more.",
  },
  {
    icon: "fa-chart-line",
    title: "Track Registrations",
    desc: "Real-time dashboard for attendees, payments, and engagement analytics.",
  },
  {
    icon: "fa-qrcode",
    title: "Digital Tickets",
    desc: "Instant ticket generation + on-ground scanning. No more paper tickets.",
  },
  {
    icon: "fa-bullhorn",
    title: "Promote Your Event",
    desc: "SEO-friendly sharing, custom landing pages, and social media integrations.",
  },
];

const Features = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
    {featuresarray.map(({ icon, title, desc }, idx) => (
      <div
        key={idx}
        className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        {/* Icon Container with Hover Effect */}
        <div className="w-14 h-14 mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
          <i className={`fa-solid ${icon} text-2xl text-primary group-hover:text-white transition-colors duration-300`}></i>
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default Features;