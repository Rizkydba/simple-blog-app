"use client"; //LocalStorage

import RichTextEditor from "./RichTextEditor";

type ArticleFormProps = {
  title: string;
  slug: string;
  thumbnail: string;

  content: string;

  onTitleChange: (value: string) => void;
  onThumbnailChange: (value: string) => void;
  onContentChange: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;

  submitLabel: string;
};

export default function ArticleForm({
  title,
  slug,
  thumbnail,

  content,

  onTitleChange,
  onThumbnailChange,
  onContentChange,

  onSubmit,

  submitLabel,
}: ArticleFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* TITLE */}
      <div>
        <label className="block mb-1">Title</label>

        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </div>

      {/* SLUG */}
        <div>
            <label className="block mb-1">Slug</label>

            <input
                type="text"
                value={slug}
                disabled
                className="w-full border p-2 rounded-md bg-gray-100 text-gray-500"
            />
        </div>

     {/* THUMBNAIL */}
        <div>
            <label className="block mb-1">Thumbnail</label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = () => {
                    onThumbnailChange(reader.result as string);
                };

                reader.readAsDataURL(file);
                }}
                required
            />
            {thumbnail && (
            <img
                src={thumbnail}
                alt="Thumbnail Preview"
                className="w-full max-h-[300px] object-cover rounded-md border mt-3"
            />
            )}
        </div>

      {/* CONTENT */}
      <div>
        <label className="block mb-1">Content</label>
        <RichTextEditor
            content={content}
            onChange={onContentChange}
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        {submitLabel}
      </button>
    </form>
  );
}