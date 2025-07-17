import Navbar from "@/components/layout/Navbar";
import Banner from "@/components/layout/Banner";
import Trend from "@/components/main/Trend";
import WhatsNew from "@/components/main/WhatsNew";
import RecentArticles from "@/components/main/RecentArticles";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Navbar />
      <main className="main-padding">
        <Trend />
        <Banner />
        <WhatsNew />
        <RecentArticles />
      </main>
      <Footer />
    </>
  );
}
