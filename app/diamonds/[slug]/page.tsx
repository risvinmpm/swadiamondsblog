"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Trend from "@/components/main/Trend";
import Form from "@/components/main/Form";
import SocialStats from "@/components/common/SocialStats";
import SocialShare from "@/components/common/SocialShare";
import DiamondContent from "@/components/blog/detail/DiamondContent";
import ExploreMoreList from "@/components/blog/detail/ExploreMoreList";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import icon_fb from "@/public/assets/icon_fb.png";
import icon_tw from "@/public/assets/icon_tw.png";
import icon_ins from "@/public/assets/icon_ins.png";
import icon_yo from "@/public/assets/icon_yo.png";

const socialItems = [
  { icon: icon_fb, label: "Fans", count: "8,045" },
  { icon: icon_tw, label: "Followers", count: "5,210" },
  { icon: icon_ins, label: "Followers", count: "10,300" },
  { icon: icon_yo, label: "Subscribers", count: "3,870" },
];

export default function DiamondDetail() {
  const { slug } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const res = await axios.get(`/api/diamond/slug/${slug}`);
        setData(res.data.diamond);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return <p className="p-10">Loading…</p>;
  if (!data) return <p className="p-10 text-red-500">Diamond not found.</p>;

  return (
    <>
      <Navbar />
      <section className="main-padding">
        <Trend />

        <main className="grid grid-cols-1 md:grid-cols-12 gap-7">
          <section className="md:col-span-8 space-y-6">
            <div className="overflow-hidden rounded-md shadow-lg">
              <Image
                src={data.image}
                alt={data.title}
                width={800}
                height={400}
                className="w-full h-[300px] lg:h-[600px] object-cover rounded-md"
              />
            </div>

            <h1 className="text-3xl font-bold mt-4">{data.title}</h1>

            <p className="text-sm text-gray-500">
              {new Date(data.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <DiamondContent
              image={data.image}
              alt={data.title}
              content={data.description}
            />
          </section>

          <aside className="md:col-span-4">
            <ExploreMoreList currentSlug={slug as string} />
            <h2 className="text-2xl font-bold mb-6 mt-10">Follow Us</h2>
            <SocialStats items={socialItems} />
          </aside>
        </main>

        <div className="mt-10 hidden lg:block">
          <SocialShare items={socialItems} />
        </div>

        <Form />
      </section>
      <Footer />
    </>
  );
}
