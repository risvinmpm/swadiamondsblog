"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

interface SocialItem {
  id: string;
  label: string;
  count: string;
  icon: File | null;
}

export default function AdminSocialStats() {
  const [items, setItems] = useState<SocialItem[]>([
    { id: uuidv4(), label: "", count: "", icon: null },
  ]);

  const handleChange = (
    index: number,
    field: keyof Omit<SocialItem, "id">,
    value: any
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addField = () => {
    setItems([
      ...items,
      { id: uuidv4(), label: "", count: "", icon: null },
    ]);
  };

  const removeField = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleSubmit = async () => {
    if (items.some(item => !item.label || !item.count || !item.icon)) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    const formData = new FormData();
    items.forEach((item) => {
      formData.append("labels", item.label);
      formData.append("counts", item.count);
      if (item.icon) {
        formData.append("icons", item.icon);
      }
    });

    try {
      const res = await axios.post("/api/socialstats", formData);
      if (res.data.success) {
        Swal.fire("Success", "Social stats updated", "success");
        setItems([{ id: uuidv4(), label: "", count: "", icon: null }]);
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error", "error");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Update Social Stats</h1>

      {items.map((item, idx) => (
        <div key={item.id} className="border p-4 mb-4 space-y-2 rounded relative">
          <input
            type="text"
            placeholder="Label"
            value={item.label}
            onChange={(e) => handleChange(idx, "label", e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Count"
            value={item.count}
            onChange={(e) => handleChange(idx, "count", e.target.value)}
            className="border px-3 py-2 w-full rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleChange(idx, "icon", e.target.files?.[0] || null)
            }
            className="border px-3 py-2 w-full rounded"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => removeField(idx)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addField}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
      >
        + Add More
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
