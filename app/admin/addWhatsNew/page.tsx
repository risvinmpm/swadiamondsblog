"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function AddWhatsNewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!file) return setPreviewUrl(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please choose an image");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", text);

      const res = await axios.post("/api/whatsnew", formData);

      if (res.data.success) {
        toast.success("What's New item added!");
        setFile(null);
        setText("");
        setPreviewUrl(null);
      }
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="pt-8 px-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Add What's New</h2>

        <label htmlFor="image" className="cursor-pointer w-28 h-28 border rounded-md relative block">
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
          type="file"
          id="image"
          accept="image/*"
          hidden
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {file && (
          <p className="mt-2 text-sm text-gray-600">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        )}

        <div className="mt-6">
          <p className="text-lg font-medium">Text Description</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full mt-2 px-4 py-3 border rounded-md"
            placeholder="What's new..."
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-40 h-12 bg-[#00464d] text-white rounded-md hover:opacity-90"
        >
          ADD
        </button>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}
