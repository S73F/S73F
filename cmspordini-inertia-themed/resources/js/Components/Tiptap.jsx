import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
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
