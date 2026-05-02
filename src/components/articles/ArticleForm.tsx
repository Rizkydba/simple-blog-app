"use client"; //LocalStorage

type ArticleFormProps = {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
};

export default function ArticleForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  submitLabel,
}: ArticleFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      {/* CONTENT */}
      <div>
        <label className="block mb-1">Content</label>

        <textarea
          className="w-full border p-2 rounded-md"
          rows={6}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          required
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