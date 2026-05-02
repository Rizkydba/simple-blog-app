import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 border-b flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/admin/articles">Admin</Link>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}