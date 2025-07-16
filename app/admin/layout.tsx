import SideBar from "@/components/AdminComponents/SideBar";
import React, { ReactNode } from "react";
import { ToastContainer, toast } from 'react-toastify';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
    <ToastContainer  theme="dark" />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between text-white text-3xl font-light w-full py-10 max-h-[60px] px-12 bg-[#00464d] border border-b border-[#00464d]">
            <h3 className="font-medium">Admin Panel</h3>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
