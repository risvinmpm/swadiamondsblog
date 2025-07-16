"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateBannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!file) return setPreviewUrl(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get("/api/banner");
        if (res.data.success) {
          setTitle(res.data.banner.title);
          setPreviewUrl(res.data.banner.image);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch existing banner");
      }
    };

    fetchBanner();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !title) return toast.error("Title and image are required");

    try {
      const fd = new FormData();
      if (file) fd.append("image", file);
      fd.append("title", title);

      const res = await axios.put("/api/banner", fd);

      if (res.data.success) {
        toast.success("Banner updated!");
        setFile(null);
        setPreviewUrl(res.data.banner.image);
        setTitle(res.data.banner.title);
      }
    } catch (err) {
      console.error(err);
      toast.error("Banner update failed");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-xl"
      >
        <p className="text-xl font-semibold">Upload Banner</p>

        <label
          htmlFor="banner-image"
          className="cursor-pointer inline-block mt-4 w-full h-60 relative border rounded-md bg-gray-100"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover rounded-md"
              unoptimized
            />
          ) : (
            <FaCloudUploadAlt className="w-full h-full p-2 text-gray-500 hover:text-[#00464d]" />
          )}
        </label>

        <input
          id="banner-image"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {file && (
          <p className="mt-2 text-sm text-gray-600">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        )}

        <div className="mt-4">
          <p className="text-xl">Banner Title</p>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 px-4 py-3 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-[#00464d] text-white rounded-md hover:opacity-90"
        >
          UPDATE
        </button>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}
