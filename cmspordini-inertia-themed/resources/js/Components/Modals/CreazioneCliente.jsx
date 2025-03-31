import React, { useRef } from "react";
import { useCreazioneCliente } from "../../Hooks/Components/Modals/useCreazioneCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Content } from "../Content";
import { formBtnStack, formBtnStyle } from "../../styles/formStyles";

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
            <Content.Layout title={"Creazione cliente"} />
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
                        <TextField
                            fullWidth
                            label="Ragione sociale"
                            name="ragione_sociale"
                            variant="outlined"
                            required
                            value={data.ragione_sociale}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            variant="outlined"
                            required
                            value={data.nome}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            name="cognome"
                            variant="outlined"
                            required
                            value={data.cognome}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="Partita IVA"
                            name="partitaIVA"
                            variant="outlined"
                            required
                            value={data.partitaIVA}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Indirizzo"
                            name="indirizzo"
                            variant="outlined"
                            required
                            value={data.indirizzo}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Città"
                            name="citta"
                            variant="outlined"
                            required
                            value={data.citta}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Cap"
                            name="cap"
                            variant="outlined"
                            required
                            value={data.cap}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Provincia"
                            name="provincia"
                            variant="outlined"
                            required
                            value={data.provincia}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="emailcliente"
                            variant="outlined"
                            required
                            value={data.emailcliente}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            variant="outlined"
                            required
                            value={data.username}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            variant="outlined"
                            required
                            value={data.password}
                            onChange={handleChange}
                        />
                    </Grid2>
                </Grid2>

                <Stack sx={formBtnStack}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={formBtnStyle}
                    >
                        Crea cliente
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="reset"
                        onClick={handleDelete}
                        sx={formBtnStyle}
                    >
                        Azzera campi
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={closeModal}
                        sx={formBtnStyle}
                    >
                        Chiudi
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}
