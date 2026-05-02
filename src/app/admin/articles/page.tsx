"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "@/services/article.service";
import { Article } from "@/types/article";
import Link from "next/link";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  const loadArticles = () => {
    setArticles(getArticles());
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    deleteArticle(id);
    loadArticles();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Articles</h1>

        <Link
          href="/admin/articles/new"
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Add New
        </Link>
      </div>

      {/* EMPTY STATE */}
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="p-3 border">Articels Title</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border">Updated</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="text-sm">
                  <td className="p-3 border">
                        <Link
                            href={`/admin/articles/${article.id}`}
                            className="text-blue-600 hover:underline">
                            {article.title}
                        </Link>
                  </td>

                  <td className="p-3 border">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 border">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 border space-x-2">
                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}