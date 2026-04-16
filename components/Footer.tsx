"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "Contact", link: "/help/contact-support" },
      { name: "FAQ", link: "/help/faq" },
      { name: "Help", link: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", link: "/legal/privacy-policy" },
      { name: "Terms of Service", link: "/legal/terms-of-service" },
      { name: "Cookie Policy", link: "/legal/cookie-policy" },
      { name: "Data Policy", link: "/legal/data-policy" },
    ],
  },
];

const CONTACT_INFO = {
  email: "info@idotours.com.mk",
  phone1: "+389 76 224 065",
  phone2: "+389 70 250 259",
};

const SOCIAL_LINKS = [
  { icon: Facebook, link: "https://facebook.com", name: "Facebook" },
  {
    icon: Instagram,
    link: "https://instagram.com/idotours",
    name: "Instagram",
  },
  {
    icon: Instagram, // Consider importing a TikTok icon if available in your icon library
    link: "https://www.tiktok.com/@idotours?lang=en",
    name: "Tiktok",
  },
];

const PAYMENT_METHODS = [
  { name: "Mastercard", path: "/assets/icons/mastercard.svg" },
  { name: "Visa", path: "/assets/icons/visa.svg" },
  { name: "Stripe", path: "/assets/icons/stripe.svg" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section - 4 Column Layout */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <Image
                src="/logo.png"
                alt="IDoTours Logo"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {t("footer.missionStatement")}
            </p>

            {/* Socials moved to brand column for a modern look */}
            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Link Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-6 tracking-wide">
                {t(`footer.sections.${section.title.toLowerCase()}`)}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      target={
                        link.link.includes("support.idotours.com.mk")
                          ? "_blank"
                          : undefined
                      }
                      className="text-sm hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {t(
                        `footer.links.${link.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}`,
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Payments */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone1}`}
                  className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-500" />
                  {CONTACT_INFO.phone1}
                </a>
              </li>
              {/* <li>
                <a
                  href={`tel:${CONTACT_INFO.phone2}`}
                  className="flex items-center gap-3 text-sm hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-transparent" />{" "}
                  {CONTACT_INFO.phone2}
                </a>
              </li> */}
            </ul>

            {/* Payment Methods */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-4 uppercase tracking-wider">
                {t("footer.paymentMethods")}
              </p>
              <div className="flex items-center gap-3 bg-slate-800 w-fit p-2 rounded-xl">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.name}
                    className="opacity-70 hover:opacity-100 transition-opacity bg-white rounded p-1"
                  >
                    <Image
                      src={method.path}
                      alt={`${method.name} Logo`}
                      width={method.name === "Stripe" ? 35 : 28}
                      height={method.name === "Stripe" ? 35 : 28}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} IdoTours
          </p>
          <p className="text-xs text-slate-500 text-center md:text-right">
            Maintained by{" "}
            <a
              href="https://casevia.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              Casevia.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
