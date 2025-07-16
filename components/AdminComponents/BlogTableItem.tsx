"use client";

import Image from "next/image";
import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface BlogRow {
  _id: string;
  title: string;
  description: string;
  image: string | StaticImport;
  date: string; // formatted
}

interface Props {
  post: BlogRow;
  onDelete: (id: string) => void;
}

const BlogTableItem: React.FC<Props> = ({ post, onDelete }) => (
  <tr className="bg-white border-b text-sm text-gray-900">
    {/* Thumbnail + Title */}
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Image
          src={post.image}
          width={40}
          height={40}
          alt={post.title}
          className="rounded-md object-cover"
        />
        <span className="font-medium">{post.title}</span>
      </div>
    </td>

    {/* Description (truncated) */}
    <td className="px-6 py-4 max-w-[300px] truncate">{post.description}</td>

    {/* Date */}
    <td className="px-6 py-4 whitespace-nowrap">{post.date}</td>

    {/* Delete Action */}
    <td
      className="px-6 py-4 text-red-600 cursor-pointer hover:underline"
      onClick={() => onDelete(post._id)}
    >
      Delete
    </td>
  </tr>
);

export default BlogTableItem;