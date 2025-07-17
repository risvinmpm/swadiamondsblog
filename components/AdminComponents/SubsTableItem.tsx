"use client";

import React from "react";
import { format } from "date-fns";

interface Props {
  email: string;
  createdAt?: string;
  mongoId: string;
  onDelete: (id: string) => void;
}

const SubsTableItem: React.FC<Props> = ({ email, createdAt, mongoId, onDelete }) => {
  const formattedDate = createdAt ? format(new Date(createdAt), "dd MMM yyyy") : "N/A";

  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4 hidden sm:table-cell">{formattedDate}</td>
      <td
        className="px-6 py-4 text-red-600 hover:text-red-800 cursor-pointer"
        onClick={() => onDelete(mongoId)}
        title="Delete"
      >
        ×
      </td>
    </tr>
  );
};

export default SubsTableItem;
