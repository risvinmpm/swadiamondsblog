"use client";

import React from "react";
import Image from "next/image";

export interface SocialItem {
  label: string;
  count: string;
  icon: string;
  link: string;
}

interface Props {
  items: SocialItem[];
}

// Utility to sanitize and validate links
const sanitizeLink = (link: string): string => {
  try {
    const url = new URL(link.startsWith("http") ? link : `https://${link}`);
    return url.href;
  } catch {
    return "#"; // fallback to prevent broken navigation
  }
};

const SocialStats: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-5">
      {items.map((item, index) => {
        const validLink = sanitizeLink(item.link);

        return (
          <a
            key={index}
            href={validLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 mt-5 hover:opacity-80 transition"
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={40}
              height={40}
              className="object-contain w-8 h-8"
            />
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-sm text-gray-600">{item.count}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SocialStats;
