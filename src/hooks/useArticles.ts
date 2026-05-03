"use client";

import { useEffect, useState } from "react";

import { Article } from "@/types/article";
import { getArticles } from "@/services/article.service";

export default function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  const refreshArticles = () => {
    const data = getArticles();

    const sorted = [...data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    setArticles(sorted);
  };

  useEffect(() => {
    refreshArticles();
  }, []);

  return {
    articles,
    refreshArticles,
  };
}