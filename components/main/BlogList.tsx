"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerList from "./BannerList";
import NumberPagination from "@/components/common/NumberPagination";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  alt?: string;
  createdAt?: string;
}

// ───────────────────────────────────────────────
// ‼️  Change this if you want a different page size
// ───────────────────────────────────────────────
const ITEMS_PER_PAGE = 3;

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 0‑based index

  /* ──────────────────────────────────────────
   * Fetch all blogs once
   * ────────────────────────────────────────── */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blog");
        setBlogs(data.blogs ?? []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ──────────────────────────────────────────
   * Derived pagination values
   * ────────────────────────────────────────── */
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  // keep page index in bounds if blog count changes
  useEffect(() => {
    if (page >= totalPages) setPage(0);
  }, [totalPages, page]);

  const start = page * ITEMS_PER_PAGE;
  const visibleBlogs = blogs.slice(start, start + ITEMS_PER_PAGE);

  /* ──────────────────────────────────────────
   * Render
   * ────────────────────────────────────────── */
  if (loading) return <p className="p-10">Loading...</p>;
  if (blogs.length === 0)
    return <p className="p-10 text-red-500">No blogs found.</p>;

  return (
    <div className="w-full">
      {/* Blog cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleBlogs.map((post) => (
          <BannerList key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination bar */}
      {totalPages > 1 && (
        <NumberPagination
          total={totalPages}
          activeIndex={page}
          onNavigate={(idx) => {
            setPage(idx);
            // optional: smooth‑scroll back to top of list
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};

export default BlogList;
