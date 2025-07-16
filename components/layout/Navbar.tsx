import Image from "next/image";
import React from "react";
import logo from "../../public/logo.svg";
import banner from "../../public/Burjuman_banner_1.jpg";
import Link from "next/link";

const Navbar = () => {
  return (
    <section className="relative bg-[#00464d]">
      <div className="main-padding flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 py-2">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src={logo}
              alt="SWA Logo"
              width={80}
              height={50}
              className="w-20 h-auto object-contain"
            />
          </Link>
        </div>

        {/* Banner */}
        <div className="w-full sm:w-auto max-w-xs md:max-w-none">
          <Image
            src={banner}
            alt="Banner"
            width={430}
            height={200}
            className="w-full md:w-[430px] h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
