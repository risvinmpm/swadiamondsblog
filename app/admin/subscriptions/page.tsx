"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SubsTableItem from "@/components/AdminComponents/SubsTableItem";

interface EmailItem {
  _id: string;
  email: string;
  createdAt: string;
}

const EmailAdminPage = () => {
  const [emails, setEmails] = useState<EmailItem[]>([]);

  const fetchEmails = async () => {
    try {
      const res = await axios.get("/api/email");
      setEmails(res.data.emails);
    } catch {
      toast.error("Failed to fetch emails");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/email?id=${id}`);
      if (res.data.success) {
        toast.success("Deleted");
        fetchEmails();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Server error during delete");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-xl font-semibold">All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-y-auto mt-4 border border-gray-300">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 hidden sm:table-cell">Date</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubsTableItem
                key={item._id}
                mongoId={item._id}
                email={item.email}
                createdAt={item.createdAt}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailAdminPage;
