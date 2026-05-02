"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Article } from "@/types/article";
import {
  getArticleById,
  updateArticle,
} from "@/services/article.service";

import { generateSlug } from "@/lib/utils";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const foundArticle = getArticleById(id);

    if (foundArticle) {
      setArticle(foundArticle);
      setTitle(foundArticle.title);
      setContent(foundArticle.content);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!article) return;

    updateArticle({
      ...article,
      title,
      slug: generateSlug(title),
      content,
    });

    router.push("/admin/articles");
  };

  if (!article) {
    return <p className="text-gray-500">Article not found.</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Edit Article</h1>

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
            rows={6}
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
          Update Article
        </button>
      </form>
    </div>
  );
}