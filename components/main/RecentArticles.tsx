"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import axios from "axios";

import ArticleCard from "@/components/blog/recent-articles/ArticleCard";
import DotPagination from "@/components/common/DotPagination";
import NumberPagination from "@/components/common/NumberPagination";

interface Article {
  _id: string;
  image: string;
  text: string;
  alt?: string;
}

const ITEMS_PER_PAGE = 3;

export default function RecentArticles() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/api/RecentArticles");
        if (res.data.success) setArticles(res.data.items);
      } catch (err) {
        console.error("Failed to load recent articles");
      }
    };

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  const goToPage = (pageIndex: number) => {
    const slideIndex = pageIndex * ITEMS_PER_PAGE;
    swiperRef.current?.slideToLoop(slideIndex);
    setActiveGroup(pageIndex);
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-20 mb-10 px-4">
      <h1 className="text-2xl font-bold mb-10">Recent Articles</h1>

      {articles.length <= 3 ? (
        // Just render first 3 statically
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard
              key={article._id}
              image={article.image}
              text={article.text}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Render paginated swiper when more than 3 items
        <>
          <DotPagination total={totalPages} activeIndex={activeGroup} onClick={goToPage} />

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) =>
              setActiveGroup(Math.floor(swiper.realIndex / ITEMS_PER_PAGE))
            }
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={30}
            loop
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {articles.map((article, index) => (
              <SwiperSlide key={article._id}>
                <ArticleCard image={article.image} text={article.text} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          <NumberPagination total={totalPages} activeIndex={activeGroup} onNavigate={goToPage} />
        </>
      )}
    </div>
  );
}
