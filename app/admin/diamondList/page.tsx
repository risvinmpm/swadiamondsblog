"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DiamondTableItem from "@/components/AdminComponents/DiamondTableItem";

interface DiamondDoc {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function DiamondListPage() {
  const [diamonds, setDiamonds] = useState<DiamondDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDiamonds = async () => {
    try {
      const { data } = await axios.get("/api/diamond");
      setDiamonds(data.diamonds ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load diamonds");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this diamond?")) return;
    try {
      const { data } = await axios.delete("/api/diamond", {
        params: { id },
      });
      toast.success(data.msg);
      fetchDiamonds();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchDiamonds();
  }, []);

  return (
    <>
      <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
        <h1 className="text-2xl font-semibold">All Diamonds</h1>

        <div className="relative h-[80vh] max-w-[1000px] overflow-x-auto mt-4 border rounded-md">
          <table className="w-full text-sm text-gray-700">
            <thead className="uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Diamond</th>
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
              ) : diamonds.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4">
                    No diamonds found.
                  </td>
                </tr>
              ) : (
                diamonds.map((d) => (
                  <DiamondTableItem
                    key={d._id}
                    onDelete={handleDelete}
                    item={{
                      _id: d._id,
                      title: d.title,
                      description: d.description,
                      image: d.image,
                      date: new Date(d.createdAt).toLocaleDateString("en-GB", {
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

      <ToastContainer position="top-center" pauseOnHover={false} />
    </>
  );
}
