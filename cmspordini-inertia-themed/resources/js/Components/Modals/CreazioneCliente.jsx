import React, { useRef } from "react";
import { useCreazioneCliente } from "../../Hooks/Components/Modals/useCreazioneCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { ContentContainer } from "../ContentContainer";
import { modalFormBtnStyle } from "../../styles/styles";

export default function CreazioneCliente() {
    const modalRef = useRef(null);

    const {
        data,
        processing,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    } = useCreazioneCliente({ modalRef });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout title={"Creazione cliente"} />
            <Box
                component="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <Grid2
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    <Grid2 size={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Ragione sociale"
                                name="ragione_sociale"
                                variant="outlined"
                                required
                                value={data.ragione_sociale}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Nome"
                                name="nome"
                                variant="outlined"
                                required
                                value={data.nome}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Cognome"
                                name="cognome"
                                variant="outlined"
                                required
                                value={data.cognome}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={12}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Partita IVA"
                                name="partitaIVA"
                                variant="outlined"
                                required
                                value={data.partitaIVA}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Indirizzo"
                                name="indirizzo"
                                variant="outlined"
                                required
                                value={data.indirizzo}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Città"
                                name="citta"
                                variant="outlined"
                                required
                                value={data.citta}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Cap"
                                name="cap"
                                variant="outlined"
                                required
                                value={data.cap}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Provincia"
                                name="provincia"
                                variant="outlined"
                                required
                                value={data.provincia}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Email"
                                name="emailcliente"
                                variant="outlined"
                                required
                                value={data.emailcliente}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                variant="outlined"
                                required
                                value={data.username}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                variant="outlined"
                                required
                                value={data.password}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid2>

                    <Stack
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            gap: { xs: 3, md: 5 },
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={processing}
                            sx={modalFormBtnStyle}
                        >
                            Crea cliente
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            type="reset"
                            onClick={handleDelete}
                            sx={modalFormBtnStyle}
                        >
                            Azzera campi
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={closeModal}
                            sx={modalFormBtnStyle}
                        >
                            Chiudi
                        </Button>
                    </Stack>
                </Grid2>
            </Box>
        </Modal>
    );
}
