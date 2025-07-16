"use client";

import { useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaArrowUp
} from "react-icons/fa6";
import Image from "next/image";

import logo from "../../public/logo.svg";
import form_icon from "../../public/form_iocn.png";

import ring_1 from "../../public/ring_1.jpg";
import ring_2 from "../../public/ring_2.webp";
import ring_3 from "../../public/ring_3.jpg";
import ring_4 from "../../public/ring_4.jpg";
import ring_5 from "../../public/ring_5.jpg";
import ring_6 from "../../public/ring_6.jpg";

const instagramImages = [ring_1, ring_2, ring_3, ring_4, ring_5, ring_6];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
    }, 2000);
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
            Concept of SWA Diamonds came into being from CAPESTONE Ventures Pvt
            Ltd, a leading name in wholesale diamond jewellers market, that does
            business with prominent retail jewellers. Many retail jewellers who
            deal only in gold jewellery are reluctant to add diamond jewellery
            to their stock due to certain factors.
          </p>
          <div className="flex mt-10 text-lg">
            <div className="p-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
              <FaTwitter className="text-[#222222]" />
            </div>
            <div className="p-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
              <FaInstagram className="text-[#222222]" />
            </div>
            <div className="p-2 rounded-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 cursor-pointer">
              <FaPinterestP className="text-[#222222]" />
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex-[0.7] mt-10 pe-10">
          <h3 className="text-xl font-medium mb-3">Newsletter</h3>
          <p className="text-base mb-4 text-[#a8a8a8] mt-10">
            Heaven fruitful doesn&#39;t over les idays appear creeping
          </p>
          <form onSubmit={handleSubmit} className="relative pt-10">
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
          <h3 className="text-xl font-medium mb-10">Instagram Feed</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {instagramImages.map((img, index) => (
              <div
                key={index}
                className="relative w-full aspect-square max-w-[100px] mx-auto"
              >
                <Image
                  src={img}
                  alt={`ring-${index + 1}`}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 60px, 70px"
                />
              </div>
            ))}
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
