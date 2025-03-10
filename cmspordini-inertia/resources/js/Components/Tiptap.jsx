import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../css/tiptap.css";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import "../../css/tiptap.css";

const Tiptap = ({ tipo, onEditorContentSave, title }) => {
    const extensions = [StarterKit, Underline, TextStyle, Color];
    const content = "";

    const handleEditorContent = () => {
        const html = editor.getHTML();
        onEditorContentSave(tipo, html);
    };

    const editor = useEditor({
        extensions,
        content,
        onUpdate({ editor }) {
            handleEditorContent();
        },
    });

    if (!editor) return null;

    return (
        <div id="tiptap-container">
            <h2 id="tiptap-title">{title}</h2>
            <div id="toolbar">
                <input
                    type="color"
                    onInput={(event) =>
                        editor
                            .chain()
                            .focus()
                            .setColor(event.target.value)
                            .run()
                    }
                    value={editor.getAttributes("textStyle").color}
                />
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                >
                    <strong>G</strong>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <em>C</em>
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    disabled={
                        !editor.can().chain().focus().toggleUnderline().run()
                    }
                    className={editor.isActive("underline") ? "is-active" : ""}
                >
                    <u>S</u>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={editor.isActive("strike") ? "is-active" : ""}
                >
                    <s>S</s>
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "is-active" : ""}
                >
                    Paragrafo
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active"
                            : ""
                    }
                >
                    H1
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active"
                            : ""
                    }
                >
                    H2
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : ""
                    }
                >
                    H3
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <img
                        src="/assets/img/bullet_list.svg"
                        alt="Elenco puntato"
                    />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    <img
                        src="/assets/img/ordered_list.svg"
                        alt="Elenco puntato"
                    />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Linea orizzontale
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    <img
                        src="/assets/img/back-arrow.svg"
                        alt="Annulla modifica"
                    />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    <img
                        src="/assets/img/forward-arrow.svg"
                        alt="Ripristina modifica"
                    />
                </button>
            </div>
            <div>
                <div id="editor-container">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
};

export default Tiptap;
