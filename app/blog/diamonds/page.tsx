"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BannerList from "@/components/main/BannerList";
import NumberPagination from "@/components/common/NumberPagination";

export interface DiamondPost {
  _id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  createdAt?: string;
}

const PER_PAGE = 3;

export default function DiamondsListPage() {
  const [diamonds, setDiamonds] = useState<DiamondPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get("/api/diamond");
        setDiamonds(data.diamonds ?? []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalPages = Math.ceil(diamonds.length / PER_PAGE);
  const visible = diamonds.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  if (loading) return <p className="p-10">Loading…</p>;
  if (diamonds.length === 0) return <p className="p-10">No diamonds found.</p>;

  return (
    <section className="main-padding">
      <h1 className="text-3xl font-bold mb-8">Diamonds Knowledge Base</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visible.map((d) => (
          <BannerList
            key={d._id}
            post={{
              ...d,
              alt: d.title,
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <NumberPagination
          total={totalPages}
          activeIndex={page}
          onNavigate={(i) => {
            setPage(i);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </section>
  );
}
