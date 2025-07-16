"use client";

import Image from "next/image";
import React from "react";

export interface WhatsNewItem {
  _id: string;
  image: string;
  text: string;
  alt?: string;
}

interface Props {
  items: WhatsNewItem[];
}

const WhatsNewGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
      {items.map((item) => (
        <div
          key={item._id}
          className="relative group rounded-md shadow-md"
        >
          <Image
            src={item.image}
            alt={item.alt || "whats-new"}
            width={400}
            height={300}
            className="w-full h-[300px] object-cover rounded-md"
          />
          <div className="absolute bottom-0 bg-white px-4 py-7 rounded-md shadow-md transition-transform duration-300 group-hover:translate-y-2 max-w-[85%]">
            <p className="text-lg leading-snug font-semibold text-gray-800">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatsNewGrid;
