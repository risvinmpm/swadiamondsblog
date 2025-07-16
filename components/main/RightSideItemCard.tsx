import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface RightSideItem {
  _id: string;
  slug: string;
  title: string;
  image: string;
  alt?: string;
}

type Props = {
  item: RightSideItem;
  isLast: boolean;
};

const RightSideItemCard = ({ item, isLast }: Props) => {
  return (
    <div className={`flex gap-4 pb-4 ${!isLast ? "border-b border-gray-200" : ""}`}>
      <div className="relative w-[120px] h-[100px] flex-shrink-0 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.alt || item.title || "Diamond image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100px, 120px"
        />
      </div>
      <div className="flex-1">
        <Link href={`/blog/diamonds/${item.slug}`} className="block">
          <h2 className="text-lg font-semibold hover:text-teal-600 transition-colors duration-300">
            {item.title}
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default RightSideItemCard;
