import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content } from "../Content";
import { formBtnStyle } from "../../styles/formStyles";
import { useEliminazioneOrdine } from "../../Hooks/Components/Modals/useEliminazioneOrdine";

/**
 * Componente per la modale di eliminazione di un ordine.
 * Gestisce la conferma dell'eliminazione di un ordine.
 * L'eliminazione è irreversibile.
 *
 * @param {Object} ordine - Dati dell'ordine che si vuole eliminare.
 * @param {string} stato - Stato dell'ordine (utile per logica di gestione).
 * @returns {JSX.Element} La UI per la conferma dell'eliminazione di un ordine.
 */
export default function EliminazioneOrdine({ ordine, stato }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Funzioni per la gestione dell'eliminazione e chiusura della modale
    const { handleDelete, closeModal } = useEliminazioneOrdine({
        ordine,
        modalRef,
        stato,
    });

    return (
        <Modal ref={modalRef}>
            {/* Titolo della modale */}
            <Content.Layout title="Eliminazione ordine" />

            {/* Contenuto della modale */}
            <Box sx={{ textAlign: "center" }}>
                {/* Messaggio di conferma per l'eliminazione dell'ordine */}
                <Typography mb={1}>
                    Sei sicuro di voler eliminare l'ordine?
                </Typography>

                {/* Avviso di irreversibilità dell'eliminazione */}
                <Typography color="error" fontWeight="500" mb={3}>
                    ATTENZIONE: l'eliminazione dell'ordine non è reversibile
                </Typography>

                {/* Stack per i pulsanti di conferma o annullamento */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 2, md: 3 }}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        sx={formBtnStyle}
                    >
                        Si
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={closeModal}
                        sx={formBtnStyle}
                    >
                        No
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
