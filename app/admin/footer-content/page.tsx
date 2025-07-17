"use client";

import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFooterContent = () => {
  const [aboutText, setAboutText] = useState("");
  const [newsletterText, setNewsletterText] = useState("");
  const [newsletterHeading, setNewsletterHeading] = useState("");
  const [instagramHeading, setInstagramHeading] = useState("");
  const [instagramImages, setInstagramImages] = useState([""]);
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    instagram: "",
    pinterest: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/footer-content", {
        aboutText,
        newsletterText,
        newsletterHeading,
        instagramHeading,
        instagramImages,
        socialLinks,
      });
      toast.success("✅ Footer content saved successfully!");
    } catch (error) {
      toast.error("❌ Failed to save footer content.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Footer Content</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* About Text */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">About Text</label>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Enter about section text..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={4}
          />
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Newsletter Section</h3>
          <label className="block text-sm text-gray-600 mb-1">Newsletter Heading</label>
          <input
            type="text"
            value={newsletterHeading}
            onChange={(e) => setNewsletterHeading(e.target.value)}
            placeholder="Enter newsletter heading"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm text-gray-600 mt-4 mb-1">Newsletter Text</label>
          <textarea
            value={newsletterText}
            onChange={(e) => setNewsletterText(e.target.value)}
            placeholder="Enter newsletter text"
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={3}
          />
        </div>

        {/* Instagram Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Instagram Section</h3>
          <label className="block text-sm text-gray-600 mb-1">Instagram Heading</label>
          <input
            type="text"
            value={instagramHeading}
            onChange={(e) => setInstagramHeading(e.target.value)}
            placeholder="Enter Instagram heading"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <label className="block text-sm text-gray-600 mt-4 mb-1">Instagram Image URL</label>
          <input
            type="text"
            value={instagramImages[0]}
            onChange={(e) => setInstagramImages([e.target.value])}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Media Links</h3>
          <input
            type="text"
            value={socialLinks.twitter}
            onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
            placeholder="Twitter URL"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            value={socialLinks.instagram}
            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
            placeholder="Instagram URL"
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            value={socialLinks.pinterest}
            onChange={(e) => setSocialLinks({ ...socialLinks, pinterest: e.target.value })}
            placeholder="Pinterest URL"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-900 transition"
          >
            Save Footer Content
          </button>
        </div>
      </form>

      {/* Toast Container */}
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar /> */}
    </div>
  );
};

export default AddFooterContent;
