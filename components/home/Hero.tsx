"use client";

import SearchBlock from "@/app/search/_components/SearchBlock";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col justify-between md:pb-24 bg-slate-900 overflow-hidden">
      <div className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto px-4 paddingX">
          <div className="space-y-10 pt-16 sm:pt-24 md:pt-32 pb-10">
            {/* Hero Copy */}
            <div className="max-w-3xl space-y-6 text-center md:text-left mx-auto md:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                {t("hero.title", "Your Journey Starts Here.")}
              </h1>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto md:mx-0">
                {t(
                  "hero.desc",
                  "Book direct with IDoTours for the most comfortable, reliable, and secure bus travel across Macedonia and beyond.",
                )}
              </p>
            </div>

            {/* Search Block Wrapper */}
            <div className="relative w-full mx-auto md:mx-0 mt-8">
              {/* Added a subtle glowing aura behind the search block to make it pop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl pointer-events-none" />
              <div className="relative z-10">
                <SearchBlock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
