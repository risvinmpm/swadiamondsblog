"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDiamondPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    if (!file) return setPreviewUrl(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Choose an image");

    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("title", data.title);
      fd.append("description", data.description);

      const res = await axios.post("/api/diamond", fd);
      if (res.data.success) {
        toast.success(res.data.msg);
        setData({ title: "", description: "" });
        setFile(null);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="pt-5 px-5 sm:pt-12 sm:pl-16 max-w-xl"
      >
        <p className="text-xl font-semibold">Upload Thumbnail</p>

        <label
          htmlFor="image"
          className="cursor-pointer inline-block mt-4 w-28 h-28 relative border rounded-md"
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
          id="image"
          type="file"
          accept="image/*"
          hidden
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {file && (
          <p className="mt-2 text-sm text-gray-600">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        )}

        <div className="mt-4">
          <p className="text-xl">Diamond Title</p>
          <input
            name="title"
            value={data.title}
            onChange={onChange}
            className="w-full mt-2 px-4 py-3 border rounded-md"
            required
          />
        </div>

        <p className="text-xl mt-4">Description (Markdown)</p>
        <textarea
          name="description"
          value={data.description}
          onChange={onChange}
          className="w-full mt-2 px-4 py-3 border rounded-md"
          rows={6}
          required
        />

        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-[#00464d] text-white rounded-md hover:opacity-90"
        >
          ADD
        </button>
      </form>

      <ToastContainer position="top-center" />
    </>
  );
}
