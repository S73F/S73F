import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ContentContainer } from "../ContentContainer";
import { formBtnStyle } from "../../styles/styles";
import { useEliminazioneOrdine } from "../../Hooks/Components/Modals/useEliminazioneOrdine";

export default function EliminazioneOrdine({ ordine, stato }) {
    const modalRef = useRef(null);
    const { handleDelete, closeModal } = useEliminazioneOrdine({
        ordine,
        modalRef,
        stato,
    });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout title="Eliminazione ordine" />
            <Box sx={{ textAlign: "center" }}>
                <Typography>Sei sicuro di voler eliminare l'ordine?</Typography>
                <Typography color="error" fontWeight="500" mb={3}>
                    ATTENZIONE: l'eliminazione dell'ordine non è reversibile
                </Typography>
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
