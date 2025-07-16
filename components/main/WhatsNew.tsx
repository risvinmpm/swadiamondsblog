"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import icon_fb from "@/public/icon_fb.png";
import icon_tw from "@/public/icon_tw.png";
import icon_ins from "@/public/icon_ins.png";
import icon_yo from "@/public/icon_yo.png";
import img_8 from "@/public/img_8.jpg";

import WhatsNewGrid from "@/components/blog/whatsnew/WhatsNewGrid";
import SocialStats from "../common/SocialStats";

interface WhatsNewItem {
  _id: string;
  image: string;
  text: string;
  alt?: string;
}

const socialItems = [
  { icon: icon_fb, label: "Fans", count: "8,045" },
  { icon: icon_tw, label: "Followers", count: "5,210" },
  { icon: icon_ins, label: "Followers", count: "10,300" },
  { icon: icon_yo, label: "Subscribers", count: "3,870" },
];

const WhatsNew = () => {
  const [items, setItems] = useState<WhatsNewItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/whatsnew");
        const data = await res.json();
        if (data.success) setItems(data.items);
      } catch (err) {
        console.error("Failed to fetch what's new items", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-7 pt-14 pb-10">
      {/* Left Side - Heading + Image Grid */}
      <div className="md:col-span-8">
        <h1 className="text-2xl font-bold mb-10">What's New</h1>
        <WhatsNewGrid items={items} />
      </div>

      {/* Right Side - Social Stats */}
      <div className="md:col-span-4">
        <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
        <SocialStats items={socialItems} />
        <Image
          src={img_8}
          alt="Product"
          width={250}
          height={500}
          className="w-[250px] h-[500px] object-contain mx-auto pt-10 rounded-md"
        />
      </div>
    </div>
  );
};

export default WhatsNew;
