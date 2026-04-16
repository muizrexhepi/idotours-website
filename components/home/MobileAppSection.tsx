"use client";

import { Smartphone, Bell, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

const DigitalExperienceSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: t(
        "mobileAppSection.features.instantBooking.title",
        "Mobile-Optimized Booking",
      ),
      description: t(
        "mobileAppSection.features.instantBooking.description",
        "Book your IDoTours tickets on the go with our seamless, mobile-friendly platform. No downloads required.",
      ),
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-400" />,
      title: t(
        "mobileAppSection.features.smartNotifications.title",
        "Real-Time Updates",
      ),
      description: t(
        "mobileAppSection.features.smartNotifications.description",
        "Get instant SMS or email notifications about your departure times, delays, and journey status.",
      ),
    },
    {
      icon: <CreditCard className="w-6 h-6 text-blue-400" />,
      title: t(
        "mobileAppSection.features.securePayments.title",
        "Secure Digital Payments",
      ),
      description: t(
        "mobileAppSection.features.securePayments.description",
        "Pay safely using Visa, Mastercard, or Stripe with our encrypted, one-tap checkout process.",
      ),
    },
  ];

  return (
    <div className="bg-slate-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-12">
          {/* Header Content */}
          <div className="space-y-4 text-center w-full md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t(
                "mobileAppSection.title",
                "Your Tickets, Right in Your Pocket",
              )}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto md:mx-0">
              {t(
                "mobileAppSection.description",
                "Managing your journey with IDoTours has never been easier. Access your tickets, track your bus, and manage payments straight from your browser.",
              )}
            </p>
          </div>

          {/* Large Feature Cards */}
          <div className="w-full space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl hover:bg-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-black/20"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0 w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                  {feature.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-slate-400 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalExperienceSection;
