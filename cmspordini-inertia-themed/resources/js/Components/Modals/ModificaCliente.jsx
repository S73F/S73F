import React, { useRef } from "react";
import { useModificaCliente } from "../../Hooks/Components/Modals/useModificaCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { ContentContainer } from "../ContentContainer";
import { formBtnStyle } from "../../styles/styles";

export default function ModificaCliente({ cliente }) {
    const modalRef = useRef(null);

    const {
        data,
        processing,
        placeholderData,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    } = useModificaCliente({ cliente, modalRef });

    return (
        <Modal ref={modalRef}>
            <ContentContainer.Layout
                title={`Modifica ${cliente.ragione_sociale}`}
            />
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
                            value={data.ragione_sociale}
                            placeholder={placeholderData.ragione_sociale}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            variant="outlined"
                            value={data.nome}
                            placeholder={placeholderData.nome}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Cognome"
                            name="cognome"
                            variant="outlined"
                            value={data.cognome}
                            placeholder={placeholderData.cognome}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <TextField
                            fullWidth
                            label="Partita IVA"
                            name="partitaIVA"
                            variant="outlined"
                            value={data.partitaIVA}
                            placeholder={placeholderData.partitaIVA}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Indirizzo"
                            name="indirizzo"
                            variant="outlined"
                            value={data.indirizzo}
                            placeholder={placeholderData.indirizzo}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Città"
                            name="citta"
                            variant="outlined"
                            value={data.citta}
                            placeholder={placeholderData.citta}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Cap"
                            name="cap"
                            variant="outlined"
                            value={data.cap}
                            placeholder={placeholderData.cap}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Provincia"
                            name="provincia"
                            variant="outlined"
                            value={data.provincia}
                            placeholder={placeholderData.provincia}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="emailcliente"
                            variant="outlined"
                            value={data.emailcliente}
                            placeholder={placeholderData.emailcliente}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            variant="outlined"
                            value={data.username}
                            placeholder={placeholderData.username}
                            onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            variant="outlined"
                            value={data.password}
                            placeholder={placeholderData.password}
                            onChange={handleChange}
                        />
                    </Grid2>
                </Grid2>
                <Stack
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: { xs: 3, md: 5 },
                        justifyContent: "center",
                        flexWrap: "wrap",
                        mt: 4,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={formBtnStyle}
                    >
                        Modifica
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
