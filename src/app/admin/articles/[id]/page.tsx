"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm from "@/components/articles/ArticleForm";

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

      <ArticleForm
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        submitLabel="Update Article"
      />
    </div>
  );
}