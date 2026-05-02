"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
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
            <div key={article.id} className="grid grid-flow-col grid-rows-2 overflow-hidden border rounded-xl hover:shadow-md transition bg-white">
              {/* THUMBNAIL */}
                {article.thumbnail && (
                    <div className="relative w-full h-full">
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
                <div className="h-full flex flex-col justify-between p-4 space-y-3">
                    <div className="flex flex-col space-y-3">
                        {/* TITLE */}
                        <Link
                        href={`/articles/${article.slug}`}
                        className="inline-block text-sm text-blue-600"
                        >
                        <h2 className="text-xl font-semibold line-clamp-2">
                        {article.title}
                        </h2>
                        </Link>

                        {/* TEXT */}
                        <p className="text-gray-600 text-sm">
                        {stripHtml(article.content).length > 120 ? `${stripHtml(article.content).slice(0, 120)}...` : stripHtml(article.content)}
                        </p>
                    </div>

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