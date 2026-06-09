"use client";

import {
  Bell,
  CreditCard,
  MapPinned,
  Smartphone,
  TicketCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const DigitalExperienceSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Smartphone,
      title: t(
        "mobileAppSection.features.instantBooking.title",
        "Mobile-Optimized Booking",
      ),
      description: t(
        "mobileAppSection.features.instantBooking.description",
        "Search routes, choose your date, and book your ticket from any device.",
      ),
    },
    {
      icon: Bell,
      title: t(
        "mobileAppSection.features.smartNotifications.title",
        "Real-Time Updates",
      ),
      description: t(
        "mobileAppSection.features.smartNotifications.description",
        "Receive SMS or email updates about your ticket, departure, and trip status.",
      ),
    },
    {
      icon: CreditCard,
      title: t(
        "mobileAppSection.features.securePayments.title",
        "Secure Digital Payments",
      ),
      description: t(
        "mobileAppSection.features.securePayments.description",
        "Pay safely using card payments with encrypted checkout and instant confirmation.",
      ),
    },
  ];

  return (
    <section className="bg-[#eef7ff] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 paddingX">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#145ea8] shadow-sm ring-1 ring-[#c9e2f5]">
              <TicketCheck className="h-4 w-4" />
              {t("mobileAppSection.badge", "Digital travel experience")}
            </div>

            <h2 className="text-3xl font-black tracking-tight text-[#10243f] md:text-5xl">
              {t(
                "mobileAppSection.title",
                "Your tickets, right in your pocket",
              )}
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#5e7284]">
              {t(
                "mobileAppSection.description",
                "Managing your journey with IDoTours has never been easier. Access tickets, receive updates, and manage payments directly from your browser.",
              )}
            </p>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-[0_14px_40px_rgba(15,70,120,0.08)] ring-1 ring-[#d8e9f6]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563eb] text-white">
                  <MapPinned className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-black text-[#10243f]">
                    {t("mobileAppSection.routeCard.title", "Easy route search")}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#5e7284]">
                    {t(
                      "mobileAppSection.routeCard.desc",
                      "Find routes from Macedonia to Europe and book in minutes.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group flex flex-col gap-5 rounded-2xl border border-[#d8e9f6] bg-white p-6 shadow-[0_14px_40px_rgba(15,70,120,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9dcef1] hover:shadow-[0_20px_60px_rgba(15,70,120,0.14)] sm:flex-row sm:items-center sm:p-7"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-[#10243f]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base leading-7 text-[#5e7284]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalExperienceSection;