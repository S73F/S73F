import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useEliminazioneCliente } from "../../Hooks/Components/Modals/useEliminazioneCliente";
import "../../../css/modal.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content } from "../Content";
import { formBtnStyle } from "../../styles/formStyles";

/**
 * Componente per la modale di eliminazione di un cliente.
 *
 * Gestisce la conferma dell'eliminazione di un cliente.
 * L'eliminazione è irreversibile.
 *
 * @param {Object} cliente - Dati del cliente che si vuole eliminare.
 * @returns {JSX.Element} La UI per la conferma dell'eliminazione di un cliente.
 */
export default function EliminazioneCliente({ cliente }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Funzioni per la gestione dell'eliminazione e chiusura della modale
    const { handleDelete, closeModal } = useEliminazioneCliente({
        cliente,
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            {/* Titolo della modale */}
            <Content.Layout title="Eliminazione cliente" />

            {/* Contenuto della modale */}
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ mb: 1 }}>
                    Sei sicuro di voler eliminare{" "}
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                        {cliente.ragione_sociale}
                    </Typography>
                    ?
                </Typography>

                {/* Avviso di irreversibilità dell'eliminazione */}
                <Typography color="error" fontWeight="500" mb={3}>
                    ATTENZIONE: l'eliminazione del cliente non è reversibile
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
