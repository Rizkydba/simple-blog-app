"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";
import Link from "next/link";
import { formatDate, stripHtml } from "@/lib/utils";
import Image from "next/image";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const data = getArticles();
    setArticles(data);
  }, []);

  return (
    <div className="space-y-6 py-14">
      <h1 className="text-2xl font-bold">Articles</h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="border rounded-xl overflow-hidden hover:shadow-md transition bg-white">
              {/* THUMBNAIL */}
                {article.thumbnail && (
                    <div className="relative w-full h-[200px]">
                        <Link
                        href={`/articles/${article.slug}`}
                        className="inline-block text-sm text-blue-600"
                        >
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </Link>
                    </div>
                )}

              {/* CONTENT */}
                <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-500">
                    {formatDate(article.createdAt)}
                    </p>

                    <Link
                    href={`/articles/${article.slug}`}
                    className="inline-block text-sm text-blue-600"
                    >
                    <h2 className="text-xl font-semibold line-clamp-2">
                    {article.title}
                    </h2>
                    </Link>

                    <p className="text-gray-600 text-sm">
                    {stripHtml(article.content).slice(0, 120)}...
                    </p>

                    <Link
                    href={`/articles/${article.slug}`}
                    className="inline-block text-sm text-blue-600 hover:underline"
                    >
                    Read More →
                    </Link>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}