import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";
import { Box, Button, Typography, Stack } from "@mui/material";
import Tiptap from "../Tiptap";
import { Content } from "../Content";
import { formBtnStyle } from "../../styles/formStyles";

/**
 * Componente per la gestione della modale di modifica della lavorazione di un ordine.
 * Permette all'utente di aggiungere note, caricare un file relativo alla lavorazione e inviare il tutto.
 *
 * @param {Object} ordine - Dati dell'ordine che si sta modificando.
 * @param {string} note_int - Note interne relative all'ordine che vengono visualizzate ed eventualmente modificate.
 * @returns {JSX.Element} La UI per la gestione delle modifiche alla lavorazione.
 */
const Lavorazione = ({ ordine, note_int }) => {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Hook per la gestione della logica di lavorazione
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
            {/* Titolo della modale */}
            <Content.Layout title="Modifica Lavorazione" />

            {/* Contenuto della modale */}
            <Box sx={{ textAlign: "center" }}>
                {/* Form per la gestione delle modifiche alla lavorazione */}
                <form
                    onSubmit={(e) => handleLavorazione(e, ordine)}
                    encType="multipart/form-data"
                >
                    {/* Titolo per la sezione delle note */}
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Note
                    </Typography>

                    {/* Editor per la modifica delle note interne */}
                    <Tiptap
                        onEditorContentSave={handleEditorContentSave} // Funzione per salvare il contenuto delle note
                        tipo="note_int" // Tipo di note (note interne)
                        htmlContent={note_int} // Contenuto iniziale delle note
                    />

                    {/* Pulsante per caricare un file relativo alla lavorazione */}
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

                    {/* Se presente, mostra il nome del file selezionato */}
                    {fileName && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            File selezionato: {fileName}
                        </Typography>
                    )}

                    {/* Stack per i pulsanti di invio e chiusura */}
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
                            sx={formBtnStyle}
                        >
                            Invia
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="button"
                            onClick={closeModal}
                            sx={formBtnStyle}
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
