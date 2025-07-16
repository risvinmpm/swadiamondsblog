"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BlogDoc {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string; // from Mongo timestamps
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch helpers ---------- */
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog");
      setBlogs(data.blogs ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Delete handler ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    try {
      const { data } = await axios.delete("/api/blog", { params: { id } });
      toast.success(data.msg || "Blog deleted");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------- Render ---------- */
  return (
    <>
      <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
        <h1 className="text-2xl font-semibold">All Blogs</h1>

        <div className="relative h-[80vh] max-w-[1000px] overflow-x-auto mt-4 border rounded-md">
          <table className="w-full text-sm text-gray-700">
            <thead className="uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Blog</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    Loading…
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((b) => (
                  <BlogTableItem
                    key={b._id}
                    onDelete={handleDelete}
                    post={{
                      _id: b._id,
                      title: b.title,
                      description: b.description,
                      image: b.image,
                      date: new Date(b.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast display (one per tree is enough) */}
      <ToastContainer position="top-center" pauseOnHover={false} />
    </>
  );
}