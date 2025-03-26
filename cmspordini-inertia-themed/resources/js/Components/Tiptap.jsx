// import React, { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import "../../css/tiptap.css";
// import Underline from "@tiptap/extension-underline";
// import { Color } from "@tiptap/extension-color";
// import TextStyle from "@tiptap/extension-text-style";
// import "../../css/tiptap.css";

// const extensions = [StarterKit, Underline, TextStyle, Color];

// const TiptapContainer = ({ children, htmlContent }) => {
//     return <div id="tiptap-container">{children}</div>;
// };

// const TiptapContainerHalf = ({ children }) => {
//     return <div id="tiptap-container-50">{children}</div>;
// };

// const TiptapTitle = ({ title }) => {
//     return <h2 id="tiptap-title">{title}</h2>;
// };

// const TiptapToolbar = ({ editor }) => {
//     if (!editor) return null;

//     return (
//         <div id="toolbar">
//             <input
//                 type="color"
//                 onInput={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().setColor(event.target.value).run();
//                 }}
//                 value={editor.getAttributes("textStyle").color}
//             />
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleBold().run();
//                 }}
//                 disabled={!editor.can().chain().focus().toggleBold().run()}
//                 className={editor.isActive("bold") ? "is-active" : ""}
//             >
//                 <strong>G</strong>
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleItalic().run();
//                 }}
//                 disabled={!editor.can().chain().focus().toggleItalic().run()}
//                 className={editor.isActive("italic") ? "is-active" : ""}
//             >
//                 <em>C</em>
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleUnderline().run();
//                 }}
//                 disabled={!editor.can().chain().focus().toggleUnderline().run()}
//                 className={editor.isActive("underline") ? "is-active" : ""}
//             >
//                 <u>S</u>
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleStrike().run();
//                 }}
//                 disabled={!editor.can().chain().focus().toggleStrike().run()}
//                 className={editor.isActive("strike") ? "is-active" : ""}
//             >
//                 <s>S</s>
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().setParagraph().run();
//                 }}
//                 className={editor.isActive("paragraph") ? "is-active" : ""}
//             >
//                 Paragrafo
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleHeading({ level: 1 }).run();
//                 }}
//                 className={
//                     editor.isActive("heading", { level: 1 }) ? "is-active" : ""
//                 }
//             >
//                 H1
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleHeading({ level: 2 }).run();
//                 }}
//                 className={
//                     editor.isActive("heading", { level: 2 }) ? "is-active" : ""
//                 }
//             >
//                 H2
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleHeading({ level: 3 }).run();
//                 }}
//                 className={
//                     editor.isActive("heading", { level: 3 }) ? "is-active" : ""
//                 }
//             >
//                 H3
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleBulletList().run();
//                 }}
//                 className={editor.isActive("bulletList") ? "is-active" : ""}
//             >
//                 <img src="/assets/img/bullet_list.svg" alt="Elenco puntato" />
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().toggleOrderedList().run();
//                 }}
//                 className={editor.isActive("orderedList") ? "is-active" : ""}
//             >
//                 <img src="/assets/img/ordered_list.svg" alt="Elenco puntato" />
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().setHorizontalRule().run();
//                 }}
//             >
//                 Linea orizzontale
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().undo().run();
//                 }}
//                 disabled={!editor.can().chain().focus().undo().run()}
//             >
//                 <img src="/assets/img/back-arrow.svg" alt="Annulla modifica" />
//             </button>
//             <button
//                 onClick={(event) => {
//                     event.preventDefault();
//                     editor.chain().focus().redo().run();
//                 }}
//                 disabled={!editor.can().chain().focus().redo().run()}
//             >
//                 <img
//                     src="/assets/img/forward-arrow.svg"
//                     alt="Ripristina modifica"
//                 />
//             </button>
//         </div>
//     );
// };

// const TiptapEditor = ({
//     onEditorContentSave,
//     onEditorContentDelete,
//     tipo,
//     htmlContent,
// }) => {
//     let content = "";
//     htmlContent ? (content = htmlContent) : (content = "");

//     const editor = useEditor({
//         extensions,
//         content,
//         onUpdate() {
//             const html = editor.getHTML();
//             onEditorContentSave(tipo, html);
//         },
//     });

//     if (!editor) return null;

//     return (
//         <>
//             <TiptapToolbar editor={editor} />
//             <div id="editor-container">
//                 <EditorContent editor={editor} />
//             </div>
//         </>
//     );
// };

// const Tiptap = {
//     Container: TiptapContainer,
//     HalfContainer: TiptapContainerHalf,
//     Title: TiptapTitle,
//     Toolbar: TiptapToolbar,
//     Editor: TiptapEditor,
// };

// export default Tiptap;

import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Italic from "@tiptap/extension-italic";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuButtonUnderline,
    MenuButtonStrikethrough,
    MenuButtonBulletedList,
    MenuButtonOrderedList,
    MenuButtonUndo,
    MenuButtonRedo,
    MenuSelectHeading,
    MenuControlsContainer,
    MenuDivider,
    RichTextEditor,
} from "mui-tiptap";

export default function Tiptap({
    tipo,
    titolo,
    htmlContent,
    onEditorContentSave,
}) {
    const rteRef = useRef(null);
    const [currentColor, setCurrentColor] = useState("#000000");

    // Cambia il colore del testo
    const handleColorChange = (event) => {
        const color = event.target.value;
        setCurrentColor(color);
        rteRef.current?.editor?.chain().focus().setColor(color).run();
    };

    // Salva automaticamente il contenuto
    const handleEditorUpdate = () => {
        if (onEditorContentSave && rteRef.current?.editor) {
            const content = rteRef.current.editor.getHTML();
            onEditorContentSave(tipo, content);
        }
    };

    return (
        <div style={{ textAlign: "left", wordBreak: "break-word" }}>
            <RichTextEditor
                ref={rteRef}
                extensions={[
                    StarterKit,
                    Underline,
                    TextStyle,
                    Color,
                    Placeholder.configure({
                        placeholder: titolo,
                    }),
                ]}
                content={htmlContent || ""}
                onUpdate={handleEditorUpdate} // Auto-save ad ogni modifica
                renderControls={() => (
                    <MenuControlsContainer>
                        <MenuSelectHeading />
                        <MenuDivider />
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonUnderline />
                        <MenuButtonStrikethrough />
                        <MenuDivider />
                        <MenuButtonBulletedList />
                        <MenuButtonOrderedList />
                        <MenuDivider />

                        <IconButton component="label">
                            <ColorLensIcon />
                            <input
                                type="color"
                                onChange={handleColorChange}
                                style={{ display: "none" }}
                            />
                        </IconButton>
                        <Box
                            sx={{
                                width: "40px",
                                height: "40px",
                                padding: "8px",
                                display: "flex",
                                flexDirection: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    backgroundColor: currentColor,
                                    border: "1px solid #ccc",
                                    margin: "0 auto",
                                }}
                            />
                        </Box>

                        <MenuDivider />
                        <MenuButtonUndo />
                        <MenuButtonRedo />
                    </MenuControlsContainer>
                )}
            />
        </div>
    );
}
