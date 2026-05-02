"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Article } from "@/types/article";
import { getArticles } from "@/services/article.service";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);

  const currentUrl =
  typeof window !== "undefined"
    ? window.location.href
    : "";

    const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,

    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    };

    const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(currentUrl);

        alert("Link copied!");
    } catch (error) {
        alert("Failed to copy link");
    }
    };

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
  <article className="max-w-4xl mx-auto space-y-6 pt-6 pb-20">
    {/* BACK */}
    <Link
      href="/articles"
      className="text-sm text-gray-500 hover:underline inline-block"
    >
      ← Back to Articles
    </Link>

    {/* THUMBNAIL */}
    {article.thumbnail && (
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    )}

    {/* TITLE */}
    <div className="space-y-3">
      <h1 className="text-4xl font-bold leading-tight">
        {article.title}
      </h1>

      {/* META */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <span>
          {formatDate(article.createdAt)}
        </span>

        <span>•</span>

        {/* SHARE */}
        <div className="flex items-center gap-3">
          <button
            onClick={copyLink}
            className="hover:underline"
          >
            Copy Link
          </button>

          <a
            href={shareLinks.whatsapp}
            target="_blank"
            className="hover:underline"
          >
            WhatsApp
          </a>

          <a
            href={shareLinks.twitter}
            target="_blank"
            className="hover:underline"
          >
            Twitter/X
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            className="hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <div
      className="
        prose
        prose-lg
        max-w-none
      "
      dangerouslySetInnerHTML={{
        __html: article.content,
      }}
    />
  </article>
);
}