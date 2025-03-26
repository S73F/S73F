import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useEliminazioneCliente } from "../../Hooks/Components/Modals/useEliminazioneCliente";
import "../../../css/modal.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ContentContainer } from "../ContentContainer";
import { formBtnStyle } from "../../styles/styles";

export default function EliminazioneCliente({ cliente }) {
    const modalRef = useRef(null);
    const { handleDelete, closeModal } = useEliminazioneCliente({
        cliente,
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout title="Eliminazione cliente" />
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ mb: 3 }}>
                    Sei sicuro di voler eliminare{" "}
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                        {cliente.ragione_sociale}
                    </Typography>
                    ?
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
