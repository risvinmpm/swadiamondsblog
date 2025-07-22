"use client";

import React from "react";
import Image from "next/image";

export interface SocialItem {
  label: string;
  count: string;
  icon: string;
}

interface Props {
  items: SocialItem[];
}

const SocialStats: React.FC<Props> = ({ items }) => {
  if (!items || !items.length) return null;

  return (
    <div className="grid grid-cols-2 gap-5">
      {items.map((item, index) => (
        <div key={index} className="flex mt-5 gap-4">
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
        </div>
      ))}
    </div>
  );
};

export default SocialStats;
