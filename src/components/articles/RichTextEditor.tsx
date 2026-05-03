"use client"; //LocalStorage

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect,useRef } from "react";

type RichTextEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],

    content:"",

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

  useEffect(() => {
  if (editor && content !== editor.getHTML()) {
    editor.commands.setContent(content, {
      emitUpdate: false,
    });
  }
}, [content, editor]);

  if (!editor) return null;
  

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    const reader = new FileReader();

    reader.onloadend = () => {
        editor
        .chain()
        .focus()
        .setImage({
            src: reader.result as string,
        })
        .run();
    };

    reader.readAsDataURL(file);
    };

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
            onClick={() => fileInputRef.current?.click()}
            className="border px-3 py-1 rounded">
            Insert Image
        </button>

        <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
        />
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} />
    </div>
  );
}