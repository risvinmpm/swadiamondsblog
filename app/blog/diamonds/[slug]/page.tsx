// app/diamond/[slug]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Trend from "@/components/main/Trend";
import SocialStats from "@/components/common/SocialStats";
import SocialShare from "@/components/common/SocialShare";
import BlogContent from "@/components/blog/bloglist/BlogContent";
import ExploreMoreList from "@/components/blog/detail/ExploreMoreList"; // your diamond explore component
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ContactForm from "@/app/contact/page";

interface SocialItem {
  _id?: string;
  icon: string;
  label: string;
  count: string;
  link: string;
}

export default function DiamondDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socialItems, setSocialItems] = useState<SocialItem[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchDiamond = async () => {
      try {
        const res = await axios.get(`/api/diamond/slug/${slug}`);
        setData(res.data.diamond);
      } catch (err) {
        console.error("Failed to fetch diamond:", err);
        setError("Diamond not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiamond();
  }, [slug]);

  useEffect(() => {
    const fetchSocialStats = async () => {
      try {
        const res = await fetch("/api/socialstats");
        const data = await res.json();
        if (data.success && data.stats?.items) {
          setSocialItems(data.stats.items);
        }
      } catch (err) {
        console.error("Failed to fetch social stats", err);
      }
    };
    fetchSocialStats();
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;
  if (error || !data) return <p className="p-10 text-red-500">{error}</p>;

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
                year: "numeric"
              })}
            </p>

            <BlogContent content={data.description} />
          </section>

          <aside className="md:col-span-4">
            <ExploreMoreList currentSlug={slug as string} />
            <h2 className="text-2xl font-bold mb-6 mt-10">Follow Us</h2>
            <SocialStats items={socialItems} />
          </aside>
        </main>

        <div className="mt-10 hidden lg:block">
          <SocialShare items={socialItems} />
        </div>

        <ContactForm />
      </section>
      <Footer />
    </>
  );
}
