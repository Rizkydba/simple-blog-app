"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Article } from "@/types/article";
import { getArticles } from "@/services/article.service";
import Link from "next/link";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const articles = getArticles();

    const foundArticle = articles.find(
      (item) => item.slug === slug
    );

    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [slug]);

  if (!article) {
    return <p className="text-gray-500">Article not found.</p>;
  }

  return (
    <article className="max-w-3xl space-y-4">
      <Link
        href="/articles" className="text-sm text-gray-500 hover:underline">
        ← Back
      </Link>
      <h1 className="text-3xl font-bold">
        {article.title}
      </h1>

      <p className="text-sm text-gray-500">
        {new Date(article.createdAt).toLocaleDateString()}
      </p>

      <div className="text-gray-700 whitespace-pre-line">
        {article.content}
      </div>
    </article>
  );
}