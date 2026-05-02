"use client"; //LocalStorage

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/services/article.service";
import { generateSlug } from "@/lib/utils";

export default function CreateArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle = {
      id: crypto.randomUUID(),
      title,
      slug: generateSlug(title),
      content,
    };

    createArticle(newArticle);

    router.push("/admin/articles");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Create Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block mb-1">Content</label>
          <textarea
            className="w-full border p-2 rounded-md"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
}