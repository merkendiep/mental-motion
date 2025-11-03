"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm lg:prose-lg max-w-none focus:outline-none min-h-[200px] lg:min-h-[300px] p-3 lg:p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-base-300 rounded-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-base-300 bg-base-100 overflow-x-auto">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("bold") ? "btn-primary" : "btn-ghost"
          }`}
          title="Bold"
        >
          <strong className="text-xs lg:text-sm">B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("italic") ? "btn-primary" : "btn-ghost"
          }`}
          title="Italic"
        >
          <em className="text-xs lg:text-sm">I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("strike") ? "btn-primary" : "btn-ghost"
          }`}
          title="Strikethrough"
        >
          <s className="text-xs lg:text-sm">S</s>
        </button>
        <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("heading", { level: 2 })
              ? "btn-primary"
              : "btn-ghost"
          }`}
          title="Heading 2"
        >
          <span className="text-xs lg:text-sm">H2</span>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("heading", { level: 3 })
              ? "btn-primary"
              : "btn-ghost"
          }`}
          title="Heading 3"
        >
          <span className="text-xs lg:text-sm">H3</span>
        </button>
        <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("bulletList") ? "btn-primary" : "btn-ghost"
          }`}
          title="Bullet List"
        >
          <span className="text-xs lg:text-sm">• List</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("orderedList") ? "btn-primary" : "btn-ghost"
          }`}
          title="Numbered List"
        >
          <span className="text-xs lg:text-sm">1. List</span>
        </button>
        <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`btn btn-xs lg:btn-sm ${
            editor.isActive("blockquote") ? "btn-primary" : "btn-ghost"
          }`}
          title="Quote"
        >
          <span className="text-xs lg:text-sm">" Quote</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="btn btn-xs lg:btn-sm btn-ghost"
          title="Horizontal Rule"
        >
          <span className="text-xs lg:text-sm">―</span>
        </button>
        <div className="divider divider-horizontal mx-0 hidden sm:flex"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="btn btn-xs lg:btn-sm btn-ghost"
          title="Undo"
        >
          <span className="text-xs lg:text-sm">↶</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="btn btn-xs lg:btn-sm btn-ghost"
          title="Redo"
        >
          <span className="text-xs lg:text-sm">↷</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
