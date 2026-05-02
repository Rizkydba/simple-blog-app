"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  FaRocket,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";

import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";

import { stripHtml } from "@/lib/utils";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const data = getArticles();

    const sorted = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    setArticles(sorted.slice(0, 3));
  }, []);

  const visionCards = [
    {
      icon: <FaRocket />,
      title: "Innovation",
      description:
        "Continuously building modern and scalable digital experiences.",
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description:
        "Working closely with teams and clients to achieve impactful results.",
    },
    {
      icon: <FaLightbulb />,
      title: "Creativity",
      description:
        "Transforming ideas into intuitive and engaging products.",
    },
  ];

  return (
    <div className="pb-20">
      {/* HERO */}
      <section className="relative h-[100vh] overflow-hidden">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/hero-video.webm"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6 text-white">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Disruptors to Scale Beyond the Horizon.
              </h1>

              <p className="text-lg text-gray-200">
                We are a modern company focused on delivering
                high quality web applications and digital
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-bold">
            About Us
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our company specializes in building scalable,
            maintainable, and modern web applications using
            the latest technologies and best practices.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              Vision & Mission
            </h2>

            <p className="text-gray-600">
              Building impactful digital products through
              innovation and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visionCards.map((card, index) => (
              <div
                key={index}
                className="border rounded-2xl p-6 space-y-4 hover:shadow-md transition"
              >
                <div className="text-3xl">
                  {card.icon}
                </div>

                <h3 className="text-xl font-semibold">
                  {card.title}
                </h3>

                <p className="text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <div className="space-y-10">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">
              Latest Articles
            </h2>

            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[#0000aa]"
            >
              Explore More
              <IoIosArrowForward />
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="grid grid-flow-col grid-rows-2 overflow-hidden border rounded-xl hover:shadow-md transition bg-white"
              >
                {/* THUMBNAIL */}
                {article.thumbnail && (
                  <div className="relative w-full h-full">
                    <Link
                      href={`/articles/${article.slug}`}
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
                    <Link
                      href={`/articles/${article.slug}`}
                      className="hover:text-[#0000aa]"
                    >
                      <h2 className="text-xl font-semibold line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-sm">
                      {stripHtml(article.content).length > 120
                        ? `${stripHtml(article.content).slice(0, 120)}...`
                        : stripHtml(article.content)}
                    </p>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="group inline-flex items-center text-sm text-[#0000aa]"
                  >
                    Read More

                    <IoIosArrowForward className="transition-all duration-300 group-hover:ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}