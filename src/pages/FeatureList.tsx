import React from "react";

const FeatureList = () => {
  const featureIcons = {
    "Create unlimited events": "fa-calendar-plus",
    "Manage attendees": "fa-user-group",
    "Live stats dashboard": "fa-chart-line",
    "QR code check-ins": "fa-qrcode",
    "Automated emails": "fa-envelope-circle-check",
    "Secure & reliable": "fa-shield-check",
  };

  const features = Object.keys(featureIcons);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 mt-8">
      {features.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 group cursor-default"
        >
          {/* Icon Container */}
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <i
              className={`fa-solid ${featureIcons[item]} text-xl text-primary-300 text-white transition-colors duration-300`}
              aria-hidden="true"
            ></i>
          </div>

          {/* Text */}
          <span className="text-slate-200 font-medium text-base group-hover:text-white transition-colors duration-200">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;