"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WhatsNewItem {
  _id: string;
  image: string;
  text: string;
  createdAt: string;
  alt?: string;
}

export default function WhatsNewListPage() {
  const [items, setItems] = useState<WhatsNewItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/whatsnew");
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load what's new items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    try {
      const { data } = await axios.delete("/api/whatsnew", { params: { id } });
      toast.success(data.msg || "Item deleted");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
        <h1 className="text-2xl font-semibold">What's New List</h1>

        <div className="relative h-[80vh] max-w-[1000px] overflow-x-auto mt-4 border rounded-md">
          <table className="w-full text-sm text-gray-700">
            <thead className="uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Image</th>
                <th className="px-6 py-3 text-left">Text</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    Loading...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    No items found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-6 py-3">
                      <Image
                        src={item.image}
                        alt={item.alt || "What's New"}
                        width={100}
                        height={80}
                        className="rounded-md object-cover w-[100px] h-[80px]"
                      />
                    </td>
                    <td className="px-6 py-3 max-w-[300px] text-wrap">{item.text}</td>
                    <td className="px-6 py-3">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-center" pauseOnHover={false} />
    </>
  );
}
