import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BlogPost } from "./BlogList";

interface BannerListProps {
  post: BlogPost;
}

const BannerList: React.FC<BannerListProps> = ({ post }) => {
  return (
    <Link href={`/blog/bloglist/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-md shadow-md">
        <Image
          src={post.image}
          width={300}
          height={200}
          alt={post.alt || post.title}
          className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold group-hover:text-teal-600 transition-colors duration-300">
          {post.title}
        </h2>

        {/* {post.createdAt && (
          <p className="text-xs text-gray-500 mt-1">
            {new Date(post.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}

        {post.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {post.description}
          </p>
        )} */}
      </div>
    </Link>
  );
};

export default BannerList;
