"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface DiamondPost {
  _id: string;
  slug: string;
  title: string;
  image: string;
  alt?: string;
}

export default function ExploreMoreList({ currentSlug }: { currentSlug: string }) {
  const [posts, setPosts] = useState<DiamondPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("/api/diamond");
        setPosts(data.diamonds ?? []);
      } catch (err) {
        console.error("Failed to fetch diamonds:", err);
      }
    };
    load();
  }, []);

  const filtered = posts.filter((p) => p.slug !== currentSlug);
  if (filtered.length === 0) return null;

  const shouldScroll = filtered.length > 4;

  return (
    <aside>
      <h3 className="text-xl font-semibold mb-4">Explore More</h3>

      <div
        className={`space-y-4 pr-2 ${
          shouldScroll ? "max-h-[500px] overflow-y-auto scrollbar-hide" : ""
        }`}
      >
        {filtered.map((item, index) => (
          <div
            key={item._id}
            onClick={() => router.push(`/blog/diamonds/${item.slug}`)}
            className={`flex gap-4 pb-4 cursor-pointer ${
              index < filtered.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="relative w-[120px] h-[100px] flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt || item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 120px"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold hover:text-teal-600 transition-colors duration-300">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
