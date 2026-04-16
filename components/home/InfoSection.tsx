"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

const features = [
  {
    title: "infoSection.feature1.title",
    description: "infoSection.feature1.description",
    defaultTitle: "Premium Fleet & Comfort",
    defaultDescription:
      "Travel in our modern, climate-controlled buses equipped with plush seating and free Wi-Fi for a relaxing journey.",
    image: "/assets/icons/feature1.svg",
  },
  {
    title: "infoSection.feature2.title",
    description: "infoSection.feature2.description",
    defaultTitle: "Direct & Secure Booking",
    defaultDescription:
      "Book directly with IDoTours for the best rates. Enjoy bank-level secure payments and instant digital ticket delivery.",
    image: "/assets/icons/feature2.svg",
  },
  {
    title: "infoSection.feature3.title",
    description: "infoSection.feature3.description",
    defaultTitle: "Reliable & On-Time",
    defaultDescription:
      "Count on our professional drivers and strict adherence to schedules to get you to your destination safely and exactly on time.",
    image: "/assets/icons/feature3.svg",
  },
];

const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Optional: Subtle background glow effect */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" /> */}

      <div className="max-w-6xl mx-auto px-4 paddingX relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-pretty">
            {t("infoSection.heading", "Why travel with IDoTours?")}
          </h2>
          <p className="text-slate-400 text-lg">
            {t(
              "infoSection.subheading",
              "Experience the highest standard of road travel in Macedonia.",
            )}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-black/20"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 mb-8 rounded-2xl bg-slate-900/50 overflow-hidden flex items-center justify-center p-6 group-hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src={feature.image}
                  alt={feature.defaultTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-4 opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>

              {/* Text Content */}
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {t(feature.title, feature.defaultTitle)}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {t(feature.description, feature.defaultDescription)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
