"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export function TiptapEditor({
  value,
  onChange
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap prose-ar"
      }
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    }
  });

  if (!editor) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="rounded-xl bg-white px-3 py-2 text-sm">عريض</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="rounded-xl bg-white px-3 py-2 text-sm">مائل</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="rounded-xl bg-white px-3 py-2 text-sm">قائمة</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className="rounded-xl bg-white px-3 py-2 text-sm">يمين</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className="rounded-xl bg-white px-3 py-2 text-sm">وسط</button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="rounded-xl bg-white px-3 py-2 text-sm">فاصل</button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("رابط الصورة");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="rounded-xl bg-white px-3 py-2 text-sm"
        >
          صورة
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="rounded-xl bg-white px-3 py-2 text-sm"
        >
          جدول
        </button>
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="h-10 w-12 cursor-pointer rounded-lg border"
          title="لون النص"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
