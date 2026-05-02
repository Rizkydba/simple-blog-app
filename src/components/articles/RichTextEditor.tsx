"use client"; //LocalStorage

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type RichTextEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
    ],

    content,

    editorProps: {
      attributes: {
        class:
          "min-h-[200px] border rounded-md p-4 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt("Enter image URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* TOOLBAR */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="border px-3 py-1 rounded-md text-sm"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="border px-3 py-1 rounded-md text-sm"
        >
          H2
        </button>

        <button
          type="button"
          onClick={addImage}
          className="border px-3 py-1 rounded-md text-sm"
        >
          Add Image
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} />
    </div>
  );
}