import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import "../editor.css";
import { useNavigate } from "react-router-dom";
import { saveNote } from "../utils/firestoreFunctions";
import { useAuth } from "../context/AuthContext"; // make sure you have UID

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass = (isActive) =>
    `px-3 py-1 rounded-md text-sm font-medium border transition ${
      isActive
        ? "bg-black text-white border-black"
        : "bg-white text-black border-gray-300 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-wrap gap-2 mb-4 border-b pb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
      >
        • LIST
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
      >
        1. LIST
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
      >
        “”
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={buttonClass(false)}
      >
        ↺ UNDO
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={buttonClass(false)}
      >
        ↻ REDO
      </button>
    </div>
  );
};

const NoteEditor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Underline,
      Heading.configure({ levels: [1, 2] }),
      BulletList,
      OrderedList,
      Blockquote,
    ],

    content: `
    <h1 class="note-title">Your Title Here</h1>
    <p>Start writing your notes...</p>`,
  });

  const handleSave = async () => {
    console.log("🧪 Inside handleSave");

    if (!editor) {
      console.warn("❌ Editor is null");
    }

    if (!user) {
      console.warn("❌ user is null");
    }

    if (!editor || !user) return;

    console.log("✅ Saving note...");
    if (!editor || !user) return;

    const htmlContent = editor.getHTML();
    try {
      console.log("🟢 Saving note...");
      await saveNote(user.uid, htmlContent);
      console.log("✅ Note saved to Firestore!");
      alert("Note saved successfully!");
      navigate(-1);
    } catch (error) {
      console.error("🔥 Error in saveNote:", error.message);
    }
  };

  // 🛑 Return loading if editor not yet ready
  if (!editor) return <div className="mt-20 text-xl">Loading editor...</div>;

  return (
    <div className="mt-20 uppercase">
      <h2 className="text-3xl font-semibold mb-6 flex items-center uppercase gap-3">
        <span className="heading1">create a new note</span>
        <span className="material-symbols-rounded text-3xl text-blue-300 md:block hidden">
          keyboard_alt
        </span>
      </h2>
      <MenuBar editor={editor} />

      <div className="prose max-w-none">
        <EditorContent
          editor={editor}
          className="uppercase text-xs tracking-wide leading-7 font-medium"
        />
      </div>

      <div className="">
        <button
          type="submit"
          onClick={() => {
            console.log("Button clicked");
            handleSave();
          }}
          className="md:w-4/12 w-9/12 justify-self-start py-3 rounded-lg ring-1 ring-inset backdrop-blur-sm shadow-xl font-semibold text-sm ring-[#efefef] uppercase hover:scale-105 duration-500 transition-all flex items-center justify-center gap-3"
        >
          save{" "}
          <span className="material-symbols-rounded text-green-400">
            file_save
          </span>
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
