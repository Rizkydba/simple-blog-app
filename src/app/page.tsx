"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { ImRocket } from "react-icons/im";
import { PiBridgeLight } from "react-icons/pi";
import { LuCrown } from "react-icons/lu";

import { IoIosArrowForward } from "react-icons/io";

import { getArticles } from "@/services/article.service";
import { Article } from "@/types/article";

import { stripHtml } from "@/lib/utils";
import { motion } from "framer-motion";

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
      icon: <ImRocket />,
      title: "Accelerate Scale",
      description:
        "To provide the resources, expertise, and momentum needed to transform early stage ventures into sustainable, high impact enterprises.",
    },
    {
      icon: <PiBridgeLight />,
      title: "Bridge Ecosystems",
      description:
        "To connect our portfolio companies with a world-class network of partners, talent, and strategic investors across the globe.",
    },
    {
      icon: <LuCrown />,
      title: "Champion Innovation",
      description:
        "To foster a culture of radical thinking and ethical growth that leads the next era of global innovation.",
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
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                ease: "easeOut",
              }}
              className="inline-flex flex-col max-w-3xl space-y-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Empowering Disruptors to Scale Beyond Horizon
              </h1>

              <p className="w-xs text-lg text-gray-200">
                We provide the momentum to propel you to lead the next era of innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <div className="max-w-6xl px-4 md:px-6 py-10 xl:py-20 space-y-4 mx-auto">
          <motion.h2
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="text-3xl font-bold">
            About Us
          </motion.h2>

          <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 leading-relaxed">
            we believe that the next era of human progress is being built by those who dare to challenge the status quo. We are a venture capital firm dedicated to identifying, funding, and scaling the world's most ambitious disruptors. 
            While capital is the fuel, our partnership is the engine. We bridge the gap between groundbreaking innovation and global market dominance by providing founders with more than just financial support—we provide a launchpad of strategic mentorship, an elite global network, and the operational momentum required to scale beyond the horizon.
          </motion.p>
        </div>
      </section>

      {/* VISION */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 xl:py-20">
        <div className="space-y-10">
          <div className="space-y-3">
            <motion.h2
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="text-3xl font-bold">
              Vision & Mission
            </motion.h2>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-600">
              Become the definitive global platform that empowers the architects of the future to redefine every industry and improve the human experience through technology.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {visionCards.map((card, index) => (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                key={index}
                className="border rounded-2xl p-6 space-y-4 hover:shadow-md hover:shadow-[#FF7518] transition-shadow"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK CONTENT */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[40%_auto] xl:grid-cols-[40%_auto] items-center gap-4">
          <div className="space-y-3">
            <motion.h2
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="text-3xl font-bold">
              Partners
            </motion.h2>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-600 pr-8">
              Become the definitive global platform that empowers our co-creators to redefine every industry and improve the human experience through technology.
            </motion.p>
          </div>
          <div>
            <motion.img
            initial={{ opacity: 0, y: 0, x: 20}}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/images/Image-Generates.webp"
            className="w-full h-full rounded-2xl"/>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 xl:py-20">
        <div className="space-y-10">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">
              Latest Articles
            </h2>

            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-[#FF7518]"
            >
              Explore More
              <IoIosArrowForward />
            </Link>
          </motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                key={article.id}
                className="grid grid-flow-col grid-rows-2 overflow-hidden border rounded-xl hover:shadow-md transition-shadow bg-white"
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
                      className="hover:text-[#FF7518]"
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
                    className="group inline-flex items-center text-sm text-[#FF7518]"
                  >
                    Read More

                    <IoIosArrowForward className="transition-all duration-300 group-hover:ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}