"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import RightSideItemCard, { RightSideItem } from "./RightSideItemCard";

const RightSideList = () => {
  const [items, setItems] = useState<RightSideItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRightSideItems = async () => {
      try {
        const res = await axios.get("/api/diamond");
        setItems(res.data.diamonds);
      } catch (error) {
        console.error("Error fetching right-side items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRightSideItems();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (items.length === 0) return <p>No diamonds found.</p>;

  const shouldScroll = items.length > 5;

  return (
    <section
      className={`space-y-4 pr-2 ${
        shouldScroll ? "max-h-[620px] overflow-y-auto scrollbar-hide" : ""
      }`}
    >
      {items.map((item, index) => (
        <RightSideItemCard
          key={item.slug}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </section>
  );
};

export default RightSideList;
