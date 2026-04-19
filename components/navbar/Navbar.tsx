"use client";

import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import UserNavbarMenu from "./UserMenu";
import LanguageSelector from "@/components/dialogs/LanguageDialog";
import { NAV_LINKS } from "@/lib/data";
import { useAuth } from "../providers/auth-provider";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ className }: { className?: string }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const path = usePathname();

  return (
    <header
      className={cn(
        "w-full flex justify-between items-center py-4 px-6 bg-white",
        className,
        {
          "hidden md:flex": path.includes("/search") || path == "/checkout",
        },
      )}
    >
      <div className="flex items-center gap-12">
        <Link href={"/"} className="flex-shrink-0">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={140}
            height={60}
            className="object-contain"
            priority
          />
        </Link>
        <nav className="hidden md:flex gap-1 items-center">
          {NAV_LINKS.map((link, index) => {
            return (
              <Link
                href={link.url}
                key={index}
                className={cn(
                  "px-4 py-2 text-gray-700 text-sm font-medium hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all",
                  {
                    "text-primary bg-primary/5": path === link.url,
                  },
                )}
              >
                {t(`nav.${link.name.toLowerCase()}`)}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSelector />
        {user ? <UserNavbarMenu /> : <NavbarMenu />}
      </div>
    </header>
  );
};

export default Navbar;
