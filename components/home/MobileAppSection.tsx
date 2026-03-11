"use client";

import { Smartphone, Bell, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileAppSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t("mobileAppSection.features.instantBooking.title"),
      description: t("mobileAppSection.features.instantBooking.description"),
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t("mobileAppSection.features.smartNotifications.title"),
      description: t(
        "mobileAppSection.features.smartNotifications.description",
      ),
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: t("mobileAppSection.features.securePayments.title"),
      description: t("mobileAppSection.features.securePayments.description"),
    },
  ];

  return (
    <div className="bg-[#f9fafb] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-10">
          
          {/* Header Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {t("mobileAppSection.title")}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              {t("mobileAppSection.description")}
            </p>
          </div>

          {/* Large Feature Cards */}
          <div className="w-full space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-8 bg-white rounded-[24px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Icon Container - Matches the Teal/Blue in your screenshot */}
                <div className="flex-shrink-0 w-16 h-16 bg-[#5BB1C4] rounded-2xl flex items-center justify-center text-white shadow-sm">
                  {feature.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-500 mt-1">
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

export default MobileAppSection;