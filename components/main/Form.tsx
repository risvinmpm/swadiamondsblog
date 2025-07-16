"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

interface FormData {
  message: string;
  name: string;
  email: string;
  subject: string;
}

const Form: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    message: "",
    name: "",
    email: "",
    subject: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success message using SweetAlert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We'll get back to you soon.",
      confirmButtonColor: "#00464d"
    });

    // Reset the form
    setForm({
      message: "",
      name: "",
      email: "",
      subject: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-6 py-20"
    >
      {/* Message */}
      <div>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="mt-2 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
          placeholder="Type your message"
          required
        />
      </div>

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-2 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
          placeholder="Your name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-2 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Subject */}
      <div>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="mt-2 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
          placeholder="Subject of your message"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="text-[#00464d] uppercase font-normal cursor-pointer py-4 px-14 mt-7 border border-[#00464d] hover:bg-[#00464d] hover:text-white transition"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
