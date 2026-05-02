"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === "/";

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Articles",
      href: "/articles",
    },
    {
      label: "Admin",
      href: "/admin/articles",
    },
  ];
  
  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isHomePage && !isScrolled
              ? "bg-transparent border-transparent"
              : "bg-white border-b"
          }`}
        >
        <div className="max-w-6xl mx-auto h-16 px-4 xl:px-[0px] md:px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className={`text-lg font-bold transition ${isHomePage && !isScrolled ? "text-white" : "text-black" }`}
          >
            SimpleBlog
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition hover:opacity-70 ${isHomePage && !isScrolled ? "text-white" : isActive ? "font-semibold text-black" : "text-gray-500" }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* CONTACT DESKTOP */}
            <Link
              href="#"
              className={`hidden md:inline-block text-sm border px-4 py-2 rounded-md transition ${ isHomePage && !isScrolled ? "border-white text-white hover:bg-white hover:text-black" : "border-black text-black hover:bg-black hover:text-white" }`}
            >
              Contact Us
            </Link>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className={`md:hidden text-2xl transition ${ isHomePage && !isScrolled ? "text-white" : "text-black" }`}
            >
              <HiOutlineMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-lg transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-bold"
          >
            SimpleBlog
          </Link>

          {/* CLOSE */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            <HiX />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition ${
                  isActive
                    ? "font-semibold text-black"
                    : "text-gray-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="#" onClick={() => setIsOpen(false)} className="mt-6 border rounded-md px-4 py-3 text-center hover:bg-black hover:text-white transition">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}