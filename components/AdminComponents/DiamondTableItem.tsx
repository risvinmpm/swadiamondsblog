"use client";

import Image from "next/image";
import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface DiamondRow {
  _id: string;
  title: string;
  description: string;
  image: string | StaticImport;
  date: string;
}

interface Props {
  item: DiamondRow;
  onDelete: (id: string) => void;
}

const DiamondTableItem: React.FC<Props> = ({ item, onDelete }) => (
  <tr className="bg-white border-b text-sm text-gray-900">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          width={40}
          height={40}
          alt={item.title}
          className="rounded-md object-cover"
        />
        <span className="font-medium">{item.title}</span>
      </div>
    </td>
    <td className="px-6 py-4 max-w-[300px] truncate">{item.description}</td>
    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
    <td
      className="px-6 py-4 text-red-600 cursor-pointer hover:underline"
      onClick={() => onDelete(item._id)}
    >
      Delete
    </td>
  </tr>
);

export default DiamondTableItem;
