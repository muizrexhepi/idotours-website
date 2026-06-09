"use client";

import { useTranslation } from "react-i18next";
import {
  Armchair,
  BadgeCheck,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Armchair,
      title: t("infoSection.feature1.title", "Premium Fleet & Comfort"),
      description: t(
        "infoSection.feature1.description",
        "Travel in comfortable buses with clean interiors, air conditioning, and space to relax during your journey.",
      ),
    },
    {
      icon: ShieldCheck,
      title: t("infoSection.feature2.title", "Direct & Secure Booking"),
      description: t(
        "infoSection.feature2.description",
        "Book directly with IDoTours, pay securely, and receive your digital ticket without stress.",
      ),
    },
    {
      icon: Clock3,
      title: t("infoSection.feature3.title", "Reliable & On-Time"),
      description: t(
        "infoSection.feature3.description",
        "Clear schedules, professional drivers, and a smoother travel experience from start to finish.",
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-[#d8e9f6] bg-white py-20 sm:py-24">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#eef7ff] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#eef7ff] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 paddingX">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg">
            <BadgeCheck className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#10243f] md:text-5xl">
            {t("infoSection.heading", "Why travel with IDoTours?")}
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#5e7284]">
            {t(
              "infoSection.subheading",
              "Everything you need for a simple, comfortable, and secure bus journey.",
            )}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#d8e9f6] bg-white p-7 shadow-[0_14px_40px_rgba(15,70,120,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9dcef1] hover:shadow-[0_20px_60px_rgba(15,70,120,0.14)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-black text-[#10243f]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-[#5e7284]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;