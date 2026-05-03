"use client"; //LocalStorage

import { useState } from "react";
import useArticles from "@/hooks/useArticles";
import { deleteArticle } from "@/services/article.service";
import Link from "next/link";
import { BsTrash3 } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";

export default function AdminArticlesPage() {
  const {
  articles,
  refreshArticles,
} = useArticles();
  const [search, setSearch] = useState("");

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    deleteArticle(id);
    refreshArticles();
  };

  const filteredArticles = articles.filter((article) =>
  article.title
    .toLowerCase()
    .includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(
    filteredArticles.length / itemsPerPage
    );

    const startIndex =
    (currentPage - 1) * itemsPerPage;

    const paginatedArticles =
    filteredArticles.slice(
        startIndex,
        startIndex + itemsPerPage
    );

  return (
    <div className="max-w-6xl mx-auto px-4 xl:px-[0px] md:px-6 space-y-6 pt-24 pb-14">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Articles</h1>

        <Link
          href="/admin/articles/new"
          className="flex flex-row gap-2 items-center bg-[#FF7518] text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition"
        >
          Add New <FaCirclePlus />
        </Link>
      </div>

      {/* EMPTY STATE */}
      {articles.length === 0 ? (
        <div className="border border-dashed rounded-lg p-10 text-center">
            <h2 className="text-lg font-semibold">
                No articles yet
            </h2>

            <p className="text-gray-500 mt-2">
                Start by creating your first article.
            </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-x-auto">
            <div className="flex flex-row gap-4  justify-between">
                {/* SEARCH */}
                <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    }}
                    className="w-full border rounded-md px-4 py-2 pr-10 outline-none"
                />

                {/* CLEAR BUTTON */}
                {search && (
                    <button
                    onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                    >
                    ✕
                    </button>
                )}
                </div>

                {/* LIMIT */}
                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                    }}
                    className="border rounded-md px-3 py-2 w-fit"
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

         {/* TABEL */}
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-50 text-left text-sm">
              <tr>
                <th className="p-3 border">Articels Title</th>
                <th className="p-3 border">Created</th>
                <th className="p-3 border">Updated</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedArticles.map((article) => (
                <tr key={article.id} className="text-sm hover:bg-[#f8f8f8]">
                  <td className="p-3 border">
                        <Link
                            href={`/admin/articles/${article.id}`}
                            className="text-[#FF7518] hover:underline">
                            {article.title}
                        </Link>
                  </td>

                  <td className="p-3 border">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 border">
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 border space-x-2 text-center">
                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-500"
                      title="Delete Articles"
                    >
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end items-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                return (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md border text-sm ${
                    currentPage === page
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                >
                    {page}
                </button>
                );
            })}
            </div>
        </div>
      )}
    </div>
  );
}