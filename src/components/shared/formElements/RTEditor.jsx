"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/lib/markdown.css"; // Імпорт файлу CSS
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
} from "react-icons/fa";
import BasicInput from "@/components/shared/formElements/BasicInput";

const RtEditor = ({
  initContent,
  getMDContent = null,
  MDContent,
  form,
  label,
  inputName,
}) => {
  const [MDContentIn, setMDContentIn] = useState("");
  const [headingLevel, setHeadingLevel] = useState(1);

  const { setValue } = form;

  const editor = useEditor({
    extensions: [StarterKit, Markdown, Underline],
    content: initContent || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      console.log("markdown:", markdown);
      setValue(inputName, markdown);

      if (getMDContent) {
        getMDContent(markdown);
      } else {
        setMDContentIn(markdown);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] max-h-[300px] overflow-y-scroll",
      },
    },
  });

  if (!editor) return null;

  return (
    <>
      <div className={"flex flex-col rounded-xl border border-2"}>
        <div className="w-full">
          <h2 className={"p-2"}>{label || "Editor"}</h2>
          <div className="mb-2 flex space-x-2 border-b-2 border-t-2 border-primary px-2 py-2">
            <div className="relative">
              <button className="p-2" type="button">
                <FaHeading />
              </button>
              <select
                value={headingLevel}
                onChange={(e) => {
                  const level = Number(e.target.value);
                  setHeadingLevel(level);
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
                className={
                  "absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                }
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <option key={level} value={level}>
                    H{level}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 ${editor.isActive("italic") ? "bg-gray-300" : ""}`}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 ${editor.isActive("underline") ? "bg-gray-300" : ""}`}
            >
              <FaUnderline />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}
            >
              <FaListOl />
            </button>
          </div>
        </div>
        <div className={"tiptap-markdown-styles"}>
          {form && (
            <BasicInput
              form={form}
              type="hidden"
              inputName={inputName || "rteditor"}
              value={MDContent || MDContentIn || ""}
            />
          )}

          <EditorContent editor={editor} className={"rounded-lg p-2"} />
        </div>
      </div>
    </>
  );
};

export default RtEditor;
