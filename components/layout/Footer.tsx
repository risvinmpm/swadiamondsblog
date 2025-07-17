"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Make sure you installed it
import {
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaArrowUp
} from "react-icons/fa6";
import Image from "next/image";

import logo from "../../public/logo.svg";
import form_icon from "../../public/form_iocn.png";
import Link from "next/link";
const Footer = () => {
  const [footer, setFooter] = useState<any>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/footer-content");
        if (res.data.success) setFooter(res.data.data);
      } catch (err) {
        console.error("Footer fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error(response.data.msg || "Subscription failed");
      }
    } catch (err) {
      toast.error("Server error while subscribing.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#007481] text-white py-10 lg:py-20 xl:py-30">
      <div className="main-padding mx-auto flex flex-col md:flex-row gap-12">
        {/* About Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-light mb-10">
            <Image src={logo} width={80} height={80} alt="SWA Diamonds Logo" />
          </h2>
          <p className="text-base text-[#a8a8a8] leading-relaxed">
            {footer?.aboutText}
          </p>
          <div className="flex mt-10 text-lg">
            {footer?.socialLinks?.twitter && (
              <div className="p-2 rounded-md hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
                <Link
                  href={footer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-[#222222]" />
                </Link>
              </div>
            )}
            {footer?.socialLinks?.instagram && (
              <div className="p-2 rounded-md hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
                <Link
                  href={footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-[#222222]" />
                </Link>
              </div>
            )}
            {footer?.socialLinks?.pinterest && (
              <div className="p-2 rounded-md hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
                <Link
                  href={footer.socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPinterestP className="text-[#222222]" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex-[0.7] mt-10 pe-10">
          <h3 className="text-xl font-medium mb-3">
            {footer?.newsletterHeading || "Newsletter"}
          </h3>
          <p className="text-base mb-4 text-[#a8a8a8] mt-10">
            {footer?.newsletterText}
          </p>
          <form onSubmit={onSubmitHandler} className="relative pt-10">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#403f3f] py-2 pr-10 text-base placeholder:text-[#a8a8a8] outline-none"
              required
            />
            <button
              type="submit"
              className="absolute right-0 bottom-3 text-white cursor-pointer"
              disabled={submitting}
            >
              <Image src={form_icon} width={30} height={30} alt="submit" />
            </button>
          </form>
          {submitting && (
            <p className="text-sm mt-2 text-[#a8a8a8]">Submitting...</p>
          )}
        </div>

        {/* Instagram Feed */}
        <div className="flex-[0.5] mt-10">
          <h3 className="text-xl font-medium mb-10">
            {footer?.instagramHeading || "Instagram Feed"}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {footer.instagramImages?.map(
              (img: string, i: number) =>
                img &&
                typeof img === "string" && (
                  <Image
                    key={i}
                    src={img.startsWith("http") ? img : `/uploads/${img}`}
                    alt={`Instagram ${i}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                )
            )}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-white/20"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
