import { Article } from "@/types/article";

const STORAGE_KEY = "articles";

// GET ALL
export const getArticles = (): Article[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to parse articles:", error);
    return [];
  }
};

// SAVE ALL
const saveArticles = (articles: Article[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

// CREATE
export const createArticle = (
  article: Omit<Article, "createdAt" | "updatedAt">
) => {
  const articles = getArticles();

  const newArticle: Article = {
    ...article,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  articles.push(newArticle);
  saveArticles(articles);
};

// UPDATE
export const updateArticle = (updated: Article) => {
  const articles = getArticles().map((a) =>
    a.id === updated.id
      ? { ...updated, updatedAt: new Date().toISOString() }
      : a
  );

  saveArticles(articles);
};

// DELETE
export const deleteArticle = (id: string) => {
  const articles = getArticles().filter((a) => a.id !== id);
  saveArticles(articles);
};

// GET ONE
export const getArticleById = (id: string): Article | undefined => {
  return getArticles().find((a) => a.id === id);
};