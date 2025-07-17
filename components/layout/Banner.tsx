"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import RightSideList from "../main/RightSideList";
import BlogList from "../main/BlogList";
import axios from "axios";
import { toast } from "react-toastify";

interface BannerData {
  title: string;
  image: string;
  alt?: string;
}

const Banner = () => {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("/api/banner");
        console.log("Banner response:", res.data);
        if (res.data.success) {
          setBanner(res.data.banner);
        } else {
          toast.error(res.data.message || "Banner fetch failed");
        }
      } catch (error) {
        toast.error("Failed to load banner");
        console.error("Banner fetch error:", error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="border-b border-gray-200 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
        <div className="md:col-span-8 space-y-6">
          {banner && (
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md shadow-lg">
              <Image
                src={banner.image}
                alt={banner.alt || "Banner Image"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,26,71,0)] to-[rgba(2,26,71,0.6)]" />
              <h1 className="absolute z-20 bottom-10 left-5 text-white text-2xl sm:text-3xl font-bold">
                {banner.title}
              </h1>
            </div>
          )}

          <div>
            <BlogList />
          </div>
        </div>

        <div className="md:col-span-4">
          <RightSideList />
        </div>
      </div>
    </div>
  );
};

export default Banner;
