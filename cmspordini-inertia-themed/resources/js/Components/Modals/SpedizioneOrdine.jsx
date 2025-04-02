import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content } from "../Content";
import { formBtnStyle } from "../../styles/formStyles";
import { useSpedizioneOrdine } from "../../Hooks/Components/Modals/useSpedizioneOrdine";

export default function EliminazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    const { handleSpedizione, closeModal } = useSpedizioneOrdine({
        ordine,
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            {/* Titolo della modale */}
            <Content.Layout title="Spedizione ordine" />

            {/* Contenuto della modale */}
            <Box sx={{ textAlign: "center" }}>
                {/* Messaggio di conferma per la spedizione della lavorazione */}
                <Typography mb={1}>
                    Sei sicuro di voler spedire la lavorazione?
                </Typography>

                {/* Avviso di irreversibilità della spedizione */}
                <Typography color="error" fontWeight="500" mb={3}>
                    ATTENZIONE: una volta spedito, l'ordine non potrà più essere
                    ritirato
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
                        onClick={handleSpedizione}
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
