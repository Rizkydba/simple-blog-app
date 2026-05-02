"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const data = getArticles();
    setArticles(data);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Articles</h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles yet.</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border p-4 rounded-lg space-y-2 hover:shadow-sm transition"
            >
              <h2 className="text-xl font-semibold">
                {article.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {formatDate(article.createdAt)}
              </p>

              <p className="text-gray-700 line-clamp-2">
                {article.content}
              </p>

              <Link
                href={`/articles/${article.slug}`}
                className="text-blue-500 text-sm"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}