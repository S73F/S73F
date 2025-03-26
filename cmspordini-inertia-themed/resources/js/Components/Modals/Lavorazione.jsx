import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";
import { Box, Button, Typography, Stack } from "@mui/material";
import Tiptap from "../Tiptap";
import { ContentContainer } from "../ContentContainer";
import { modalFormBtnStyle } from "../../styles/styles";

const Lavorazione = ({ ordine, note_int }) => {
    const modalRef = useRef(null);

    const {
        fileName,
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    } = useLavorazione({ modalRef });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout title="Modifica Lavorazione" />
            <Box sx={{ textAlign: "center" }}>
                <form
                    onSubmit={(e) => handleLavorazione(e, ordine)}
                    encType="multipart/form-data"
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Note
                    </Typography>
                    <Tiptap
                        onEditorContentSave={handleEditorContentSave}
                        tipo="note_int"
                        htmlContent={note_int}
                    />

                    <Button
                        fullWidth
                        variant="outlined"
                        component="label"
                        sx={{ textTransform: "none", mt: 3 }}
                    >
                        Carica file lavorazione
                        <input
                            type="file"
                            hidden
                            name="userfile"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {fileName && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            File selezionato: {fileName}
                        </Typography>
                    )}

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 2, md: 3 }}
                        justifyContent="center"
                        sx={{ mt: 3 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={processing}
                            sx={modalFormBtnStyle}
                        >
                            Invia
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={closeModal}
                            sx={modalFormBtnStyle}
                        >
                            Chiudi
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
};

export default Lavorazione;
