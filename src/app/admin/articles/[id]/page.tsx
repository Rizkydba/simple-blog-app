"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm from "@/components/articles/ArticleForm";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

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
  const [thumbnail, setThumbnail] = useState("");

  const slug = generateSlug(title);

  useEffect(() => {
    const foundArticle = getArticleById(id);

    if (foundArticle) {
      setArticle(foundArticle);
      setTitle(foundArticle.title);
      setContent(foundArticle.content);
      setThumbnail(foundArticle.thumbnail);

      const slug = generateSlug(title);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!article) return;

    updateArticle({
      ...article,
      title,
      slug,
      thumbnail,
      content,
    });

    router.push("/admin/articles");
  };

  if (!article) {
    return <p className="text-gray-500">Article not found.</p>;
  }

  return (
    <div className="flex flex-col gap-8 pt-8 pb-20">
      <div className="flex flex-row flex-nowrap justify-between">
            <h1 className="text-2xl font-bold">Update Article</h1>
            <Link
                href="/admin/articles" className="inline-flex fler-row gap-2 items-center text-sm text-gray-500 hover:underline">
                <IoIosArrowBack /> Back to Admin
            </Link>
        </div>

      <ArticleForm
        title={title}
        slug={slug}
        thumbnail={thumbnail}
        content={content}

        onTitleChange={setTitle}
        onThumbnailChange={setThumbnail}
        onContentChange={setContent}

        onSubmit={handleSubmit}

        submitLabel="Update"
      />
    </div>
  );
}