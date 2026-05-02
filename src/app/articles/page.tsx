"use client"; //LocalStorage

import { useEffect, useState } from "react";
import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";
import Link from "next/link";
import { stripHtml } from "@/lib/utils";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 6;

  useEffect(() => {
    const data = getArticles();
    setArticles(data);
  }, []);

    const filteredArticles = articles.filter((article) => {
    const keyword = search.toLowerCase();

    const titleMatch = article.title
        .toLowerCase()
        .includes(keyword);

    const contentMatch = stripHtml(article.content)
        .toLowerCase()
        .includes(keyword);

    return titleMatch || contentMatch;
    });

    const totalPages = Math.ceil(
    filteredArticles.length / articlesPerPage
    );

    const startIndex =
    (currentPage - 1) * articlesPerPage;

    const paginatedArticles =
    filteredArticles.slice(
        startIndex,
        startIndex + articlesPerPage
    );

  return (
    <div className="max-w-6xl mx-auto px-4 xl:px-[0px] md:px-6 space-y-6 pt-24 pb-20">
    <div className="flex flex-row justify-between items-center">
      <h1 className="text-2xl font-bold">Articles</h1>

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
    </div>

      {filteredArticles.length === 0 ? (
        <div className="w-full min-h-screen flex flex-col justify-center text-gray-500 text-center">No articles available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedArticles.map((article) => (
            <div key={article.id} className="grid grid-flow-col grid-rows-2 overflow-hidden border rounded-xl hover:shadow-md transition bg-white">
              {/* THUMBNAIL */}
                {article.thumbnail && (
                    <div className="relative w-full h-full">
                        <Link
                        href={`/articles/${article.slug}`}
                        className="inline-block text-sm text-blue-600"
                        >
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </Link>
                    </div>
                )}

              {/* CONTENT */}
                <div className="h-full flex flex-col justify-between p-4 space-y-3">
                    <div className="flex flex-col space-y-3">
                        {/* TITLE */}
                        <Link
                        href={`/articles/${article.slug}`}
                        className="inline-block text-sm text-black hover:text-[#0000aa]"
                        >
                        <h2 className="text-xl font-semibold line-clamp-2">
                        {article.title}
                        </h2>
                        </Link>

                        {/* TEXT */}
                        <p className="text-gray-600 text-sm">
                        {stripHtml(article.content).length > 120 ? `${stripHtml(article.content).slice(0, 120)}...` : stripHtml(article.content)}
                        </p>
                    </div>

                    <Link
                    href={`/articles/${article.slug}`}
                    className="group inline-flex flex-row items-center inline-block text-sm text-[#0000aa]"
                    >
                    Read More <IoIosArrowForward className="transition-all duration-300 group-hover:ml-2"/>
                    </Link>
                </div>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
            {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            return (
                <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                    currentPage === page
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                >
                {page}
                </button>
            );
            })}
        </div>
        )}
    </div>
  );
}