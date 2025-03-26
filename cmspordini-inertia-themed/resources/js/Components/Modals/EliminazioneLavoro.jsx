import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ContentContainer } from "../ContentContainer";
import { modalFormBtnStyle } from "../../styles/styles";
import { useEliminazioneLavoro } from "../../Hooks/Components/Modals/useEliminazioneLavoro";

export default function EliminazioneLavoro({ ordine, stato }) {
    const modalRef = useRef(null);
    const { handleDelete, closeModal } = useEliminazioneLavoro({
        ordine,
        modalRef,
        stato,
    });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout title="Eliminazione lavoro" />
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ mb: 3 }}>
                    Sei sicuro di voler eliminare il lavoro?
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
                        sx={modalFormBtnStyle}
                    >
                        Si
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={closeModal}
                        sx={modalFormBtnStyle}
                    >
                        No
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
