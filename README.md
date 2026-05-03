# Simple Blog App

🇺🇸 EN:
A modern responsive blog and company profile web application built with Next.js App Router, TypeScript, Tailwind CSS, and LocalStorage based article management.

This project developed as a technical test assignment and evolved into a mini CMS/blog platform with rich content editing, responsive UI, and modern UX enhancements.

🇮🇩 ID:
Sebuah aplikasi web profil perusahaan dan blog responsif modern yang dibangun menggunakan Next.js App Router, TypeScript, Tailwind CSS, serta manajemen artikel berbasis LocalStorage.

Proyek ini dikembangkan sebagai tugas uji teknis, dan dikembangkan menjadi platform blog/CMS mini dengan fitur penyuntingan konten yang lengkap, antarmuka responsif, dan peningkatan pengalaman pengguna (UX) modern.

---

## Features

### Public Website
- Company profile homepage
- Responsive hero section with video background
- Vision & mission cards
- Latest articles section
- Public article list page
- Article detail page
- Responsive article cards
- Search articles by title and content
- Pagination
- Social share buttons
- Responsive navbar with mobile sidebar menu
- Smooth animations using Framer Motion

### Admin Dashboard
- Create article
- Update article
- Delete article
- Article table with pagination
- Search articles
- Auto-generated slug preview
- Thumbnail upload
- Rich text editor using Tiptap
- Inline image upload support inside article content

---

### Tech Stack

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Tiptap Editor
- React Icons
- LocalStorage (for article persistence)

---

### Project Structure

```bash
src/
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
```
---

#### Installation

Clone the repository:

```bash
git clone https://github.com/Rizkydba/simple-blog-app.git
```

Move into the project directory:

```bash
cd simple-blog-app
```

Install dependencies:

```bash
npm install
```

---

#### Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

###### Notes
🇺🇸 EN:
- This project uses LocalStorage for article persistence.
- Uploaded images are stored as Base64 strings.
- No authentication system is implemented for the admin dashboard based on project scope decisions.

🇮🇩 ID:
- Proyek ini menggunakan LocalStorage untuk penyimpanan data artikel secara persisten.
- Gambar yang diunggah disimpan dalam bentuk string Base64.
- Tidak ada sistem autentikasi yang diimplementasikan pada dashboard admin berdasarkan keputusan cakupan (scope) proyek.

---

## Author
Developed by Rizkydba.