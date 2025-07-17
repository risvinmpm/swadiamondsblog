"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const AdminFooter = () => {
  const [aboutText, setAboutText] = useState("");
  const [newsletterText, setNewsletterText] = useState("");
  const [instagramImages, setInstagramImages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(""); // for display
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("/api/footer-content");
        if (res.data.success && res.data.data) {
          const { aboutText, newsletterText, instagramImages } = res.data.data;
          setAboutText(aboutText || "");
          setNewsletterText(newsletterText || "");
          setInstagramImages(instagramImages || []);
          setInputValue((instagramImages || []).join(","));
        }
      } catch (err) {
        console.error("Failed to fetch footer content:", err);
      }
    };

    fetchFooter();
  }, []);

  const handleSubmit = async () => {
    if (
      !aboutText.trim() ||
      !newsletterText.trim() ||
      !Array.isArray(instagramImages) ||
      instagramImages.length === 0
    ) {
      alert("All fields are required, including at least one Instagram image URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/footer-content", {
        aboutText,
        newsletterText,
        instagramImages,
      });

      alert(res.data.message || "Footer content saved.");
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(error?.response?.data?.message || "Failed to save footer content.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim()).filter(Boolean);
    setInputValue(e.target.value);
    setInstagramImages(urls);
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Update Footer Content</h2>

      <label className="block mb-2 font-medium">About Text</label>
      <textarea
        className="border p-2 w-full mb-6 rounded"
        value={aboutText}
        onChange={(e) => setAboutText(e.target.value)}
        placeholder="About SWA Diamonds..."
        rows={4}
      />

      <label className="block mb-2 font-medium">Newsletter Text</label>
      <textarea
        className="border p-2 w-full mb-6 rounded"
        value={newsletterText}
        onChange={(e) => setNewsletterText(e.target.value)}
        placeholder="Newsletter subscription text..."
        rows={3}
      />

      <label className="block mb-2 font-medium">Instagram Image URLs (comma-separated)</label>
      <input
        className="border p-2 w-full mb-2 rounded"
        value={inputValue}
        onChange={handleImageInput}
        placeholder="/uploads/img1.jpg, /uploads/img2.jpg"
      />

      {/* Optional: Preview Instagram Images */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {instagramImages.map((url, index) => (
          <div key={index} className="border rounded overflow-hidden">
            <img src={url} alt={`Instagram ${index}`} className="w-full aspect-square object-cover" />
          </div>
        ))}
      </div>

      <button
        className={`mt-6 bg-blue-600 text-white px-6 py-2 rounded ${loading ? "opacity-70" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default AdminFooter;
