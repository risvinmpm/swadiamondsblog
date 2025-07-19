"use client";

import { useEffect, useState } from "react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/contact/list")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-2xl font-bold mb-6">Submitted Messages</h1>
      <div className="space-y-4">
        {messages.map((msg: any) => (
          <div key={msg._id} className="border p-4 rounded bg-white shadow">
            <p><strong>Name:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Subject:</strong> {msg.subject}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p className="text-sm text-gray-500 mt-1">Submitted: {new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
