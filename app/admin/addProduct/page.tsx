"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please choose an image");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const res = await axios.post("/api/blog", formData);

      if (res.data.success) {
        toast.success(res.data.msg);
        setData({ title: "", description: "" });
        setFile(null);
        setPreviewUrl(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed – check console");
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
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
          onChange={handleFileChange}
        />

        {file && (
          <p className="mt-2 text-sm text-gray-600">
            {file.name} ({Math.round(file.size / 1024)} KB)
          </p>
        )}

        <div className="mt-4">
          <p className="text-xl">Blog Title</p>
          <input
            name="title"
            type="text"
            value={data.title}
            onChange={onChangeHandler}
            className="w-full mt-2 px-4 py-3 border rounded-md"
            required
          />
        </div>

        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          className="w-full mt-2 px-4 py-3 border rounded-md"
          placeholder="Write content here"
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
};

export default UploadPage;
