"use client"; //LocalStorage

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/services/article.service";
import { generateSlug } from "@/lib/utils";
import ArticleForm from "@/components/articles/ArticleForm";
import Link from "next/link";

export default function CreateArticlePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const slug = generateSlug(title);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle = {
        id: crypto.randomUUID(),
        title,
        slug,
        thumbnail,
        content,
    };

    createArticle(newArticle);

    router.push("/admin/articles");
  };

  return (
    <div className="max-w-2xl space-y-6 pt-8 pb-20">
      <h1 className="text-2xl font-bold">Create Article</h1>
      <Link
        href="/admin/articles" className="text-sm text-gray-500 hover:underline">
        ← Back
      </Link>

      <ArticleForm
            title={title}
            slug={slug}
            thumbnail={thumbnail}
            content={content}

            onTitleChange={setTitle}
            onThumbnailChange={setThumbnail}
            onContentChange={setContent}

            onSubmit={handleSubmit}

            submitLabel="Create Article"
        />
    </div>
  );
}