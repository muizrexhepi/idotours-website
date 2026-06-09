"use client";

import dynamic from "next/dynamic";
import {
  Clock3,
  ShieldCheck,
  TicketCheck,
  Wifi,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SearchFormSkeleton } from "./search-form-skeleton";

const HERO_BUS_IMAGE =
  "https://autobusi.org/forum/index.php?action=dlattach;fs=149715;attach=118828";

const SearchForm = dynamic(
  () => import("../forms/SearchForm").then((mod) => mod.SearchForm),
  {
    ssr: false,
    loading: () => <SearchFormSkeleton />,
  },
);

const MobileHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white md:hidden">
      <div className="relative h-[360px] overflow-hidden bg-[#10243f]">
        <img
          src={HERO_BUS_IMAGE}
          alt={t("hero.busImageAlt", "IDoTours coach bus")}
          className="h-full w-full object-cover object-center"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/95 via-[#081827]/45 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-24">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#145ea8]">
            <TicketCheck className="h-3.5 w-3.5" />
            {t("hero.badge", "Simple bus booking across Europe")}
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white">
            {t("hero.title", "Your Journey Starts Here.")}
          </h1>

          <p className="mt-3 text-sm font-medium leading-6 text-white/90">
            {t(
              "hero.desc",
              "Book direct with IDoTours for comfortable, reliable, and secure bus travel across Macedonia and beyond.",
            )}
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-20 px-4">
        <div className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_rgba(15,70,120,0.2)] ring-1 ring-[#d8e9f6]">
          <SearchForm />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4 py-5">
        <div className="rounded-xl bg-[#eef7ff] p-3 text-center ring-1 ring-[#c9e2f5]">
          <ShieldCheck className="mx-auto h-5 w-5 text-[#2563eb]" />
          <p className="mt-2 text-xs font-bold text-[#10243f]">
            {t("hero.trust.secure", "Secure checkout")}
          </p>
        </div>

        <div className="rounded-xl bg-[#eef7ff] p-3 text-center ring-1 ring-[#c9e2f5]">
          <Clock3 className="mx-auto h-5 w-5 text-[#2563eb]" />
          <p className="mt-2 text-xs font-bold text-[#10243f]">
            {t("hero.trust.fast", "Instant tickets")}
          </p>
        </div>

        <div className="rounded-xl bg-[#eef7ff] p-3 text-center ring-1 ring-[#c9e2f5]">
          <Wifi className="mx-auto h-5 w-5 text-[#2563eb]" />
          <p className="mt-2 text-xs font-bold text-[#10243f]">
            {t("hero.trust.comfort", "Comfort routes")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileHero;