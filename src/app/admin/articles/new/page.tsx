"use client"; //LocalStorage

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/services/article.service";
import { generateSlug } from "@/lib/utils";
import ArticleForm from "@/components/articles/ArticleForm";

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

      <ArticleForm
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        submitLabel="Create Article"
      />
    </div>
  );
}