"use client"; //LocalStorage

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

  return (
    <nav className="border-b p-4">
      <div className="max-w-4xl mx-auto flex gap-4">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:opacity-70 ${
                isActive
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}