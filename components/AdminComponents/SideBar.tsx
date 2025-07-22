"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

// Icons
import { CiCirclePlus } from "react-icons/ci";
import { LuNotepadText, LuList } from "react-icons/lu";
import { FaEnvelope } from "react-icons/fa";
import { BsGem } from "react-icons/bs";
import { MdImage, MdOutlineMenuBook } from "react-icons/md";
import { IoMdContact } from "react-icons/io";

import logo from "@/public/logo.svg";

const links = [
  {
    label: "Add Blog",
    href: "/admin/addProduct",
    icon: <CiCirclePlus className="w-5 h-5" />
  },
  {
    label: "Blog Lists",
    href: "/admin/blogList",
    icon: <LuNotepadText className="w-5 h-5" />
  },
  {
    label: "Add Diamond",
    href: "/admin/addDiamond",
    icon: <BsGem className="w-5 h-5" />
  },
  {
    label: "Diamond Lists",
    href: "/admin/diamondList",
    icon: <LuList className="w-5 h-5" />
  },
  {
    label: "Add What's New",
    href: "/admin/addWhatsNew",
    icon: <CiCirclePlus className="w-5 h-5" />
  },
  {
    label: "What's New List",
    href: "/admin/whatsNewList",
    icon: <LuList className="w-5 h-5" />
  },
   {
    label: "Add Recent Article's",
    href: "/admin/addRecentArticles",
    icon: <CiCirclePlus className="w-5 h-5" />
  },
  {
    label: "Add Recent Article's List",
    href: "/admin/recentArticlesList",
    icon: <LuList className="w-5 h-5" />
  },
  {
    label: "Update Banner",
    href: "/admin/updateBanner",
    icon: <MdImage className="w-5 h-5" />
  },
  {
    label: "Contact",
    href: "/admin/messages",
    icon: <IoMdContact className="w-5 h-5" />
  },
  {
    label: "Update Footer",
    href: "/admin/footer-content",
    icon: <MdOutlineMenuBook  className="w-5 h-5" />
  },
  {
    label: "Follw Us",
    href: "/admin/socialstats",
    icon: <MdOutlineMenuBook  className="w-5 h-5" />
  },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: <FaEnvelope className="w-5 h-5" />
  }
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col bg-[#00464d] min-h-screen w-28 sm:w-80 text-white">
      {/* Logo */}
      <div className="px-4 py-3 border-b border-white">
        <Link href="/">
          <Image src={logo} width={80} height={50} alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-10 px-4">
        <ul className="space-y-4">
          {links.map(({ label, href, icon }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md border border-white transition ${
                    isActive
                      ? "bg-white text-[#00464d]"
                      : "bg-white/30 hover:bg-white/40"
                  }`}
                >
                  {icon}
                  <span className="hidden sm:inline font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
