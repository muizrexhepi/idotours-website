"use client";

import SearchBlock from "@/app/search/_components/SearchBlock";
import {
  Clock3,
  Globe2,
  ShieldCheck,
  TicketCheck,
  UsersRound,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HERO_BUS_IMAGE = "/heroimg.jpeg";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative hidden overflow-hidden bg-white md:block">
      {/* Hero image */}
      <div className="relative h-[520px] w-full overflow-hidden bg-[#10243f]">
        <Image
          src={HERO_BUS_IMAGE}
          alt={t("hero.busImageAlt", "IDoTours coach bus")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#081827]/85 via-[#081827]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 paddingX">
          <div className="max-w-3xl pb-24">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#145ea8] shadow-sm">
              <TicketCheck className="h-4 w-4" />
              {t("hero.badge", "Simple bus booking across Europe")}
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white lg:text-7xl">
              {t("hero.title", "Your Journey Starts Here.")}
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/90 lg:text-xl">
              {t(
                "hero.desc",
                "Book direct with IDoTours for comfortable, reliable, and secure bus travel across Macedonia and beyond.",
              )}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#10243f]">
                <ShieldCheck className="h-4 w-4 text-[#2563eb]" />
                {t("hero.trust.secure", "Secure checkout")}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#10243f]">
                <Clock3 className="h-4 w-4 text-[#2563eb]" />
                {t("hero.trust.fast", "Instant tickets")}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-[#10243f]">
                <Wifi className="h-4 w-4 text-[#2563eb]" />
                {t("hero.trust.comfort", "Comfort routes")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search card */}
      <div className="relative z-20 mx-auto -mt-24 max-w-7xl px-4 paddingX">
        <div className="rounded-2xl bg-white p-5 shadow-[0_24px_80px_rgba(15,70,120,0.22)] ring-1 ring-[#d8e9f6]">
          <SearchBlock />
        </div>
      </div>

      {/* Benefits row */}
      <div className="mx-auto max-w-7xl px-4 paddingX">
        <div className="grid grid-cols-4 gap-6 py-12">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5]">
              <Globe2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#10243f]">
              {t("home.benefits.routes.title", "Connecting you to Europe")}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#5e7284]">
              {t(
                "home.benefits.routes.desc",
                "Travel from Macedonia to popular European destinations with simple online booking.",
              )}
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5]">
              <Wifi className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#10243f]">
              {t("home.benefits.comfort.title", "Comfort on the go")}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#5e7284]">
              {t(
                "home.benefits.comfort.desc",
                "Modern buses, comfortable seats, air conditioning, and a smoother travel experience.",
              )}
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5]">
              <TicketCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#10243f]">
              {t("home.benefits.booking.title", "Choose, book, travel")}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#5e7284]">
              {t(
                "home.benefits.booking.desc",
                "Find your route, pay securely, and receive your ticket instantly.",
              )}
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7ff] text-[#2563eb] ring-1 ring-[#c9e2f5]">
              <UsersRound className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#10243f]">
              {t("home.benefits.together.title", "Go together")}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#5e7284]">
              {t(
                "home.benefits.together.desc",
                "Book for yourself, your family, or your group in just a few clicks.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
