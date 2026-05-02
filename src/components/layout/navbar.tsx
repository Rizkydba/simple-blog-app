import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4 flex gap-4 font-medium">
      <Link href="/">Home</Link>
      <Link href="/articles">Articles</Link>
      <Link href="/admin/articles">Admin</Link>
    </nav>
  );
}