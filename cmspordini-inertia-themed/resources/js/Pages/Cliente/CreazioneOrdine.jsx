import React, { useState } from "react";
import "../../../css/creazioneOrdine.css";
import { useCreazioneOrdine } from "../../Hooks/Cliente/useCreazioneOrdine";
import Tiptap from "../../Components/Tiptap";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { ContentContainer } from "../../Components/ContentContainer";
import {
    Box,
    Button,
    Grid2,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { formBtnStyle } from "../../styles/styles";

export default function CreazioneOrdine({ InputLabelProps = {} }) {
    const {
        data,
        editorKey,
        fileName,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    } = useCreazioneOrdine();

    return (
        <ContentContainer.Container>
            <ContentContainer.Layout title={"Spedisci nuovo ordine"}>
                <Box
                    component="form"
                    id="form-ordine"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <Grid2
                        container
                        rowSpacing={{ xs: 3, md: 4 }}
                        columnSpacing={{ xs: 1, md: 2, md: 4 }}
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
                                    label="Medico ordinante"
                                    name="medico_ordinante"
                                    variant="outlined"
                                    required
                                    value={data.medico_ordinante}
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
                                    label="Nome paziente"
                                    name="paziente_nome"
                                    variant="outlined"
                                    required
                                    value={data.paziente_nome}
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
                                    label="Cognome paziente"
                                    name="paziente_cognome"
                                    variant="outlined"
                                    required
                                    value={data.paziente_cognome}
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
                                    label="Indirizzo spedizione"
                                    name="indirizzo_spedizione"
                                    variant="outlined"
                                    required
                                    value={data.indirizzo_spedizione}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={12}>
                            <Tiptap
                                key={editorKey}
                                onEditorContentSave={handleEditorContentSave}
                                tipo={"lavorazione"}
                                titolo={"Lavorazione"}
                            />
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
                                    label="Colore"
                                    name="colore"
                                    variant="outlined"
                                    required
                                    value={data.colore}
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
                                    label="Data consegna"
                                    type="date"
                                    name="data_cons"
                                    required
                                    slotProps={{
                                        inputLabel: {
                                            ...InputLabelProps,
                                            shrink: true,
                                        },
                                    }}
                                    value={data.data_cons}
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
                                    label="Ora consegna"
                                    type="time"
                                    name="ora_cons"
                                    required
                                    slotProps={{
                                        inputLabel: {
                                            ...InputLabelProps,
                                            shrink: true,
                                        },
                                    }}
                                    value={data.ora_cons}
                                    onChange={handleChange}
                                />
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Tiptap
                                key={editorKey}
                                onEditorContentSave={handleEditorContentSave}
                                tipo={"piattaforma"}
                                titolo={"Piattaforma impianti"}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Tiptap
                                key={editorKey}
                                onEditorContentSave={handleEditorContentSave}
                                tipo={"note"}
                                titolo={"Note"}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Box
                                border="2px dashed #1976d2"
                                margin="0 auto"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius={2}
                                p={3}
                                textAlign="center"
                                sx={{
                                    width: { xs: "100%", md: "50%" },
                                }}
                            >
                                <Typography
                                    mb={2}
                                    color="error"
                                    fontWeight={500}
                                >
                                    Si ricorda che è ammesso un solo file per
                                    volta per prenotazione, qualora si debba
                                    inviare più di un file per lo stesso
                                    paziente dovrete provvedere a zippare tutti
                                    i file e le cartelle in un unico archivio
                                    compresso .ZIP
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component="label"
                                    sx={{ textTransform: "none" }}
                                >
                                    Carica file allegato
                                    <input
                                        type="file"
                                        hidden
                                        name="userfile"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                {fileName && (
                                    <Typography mt={2}>
                                        File selezionato: {fileName}
                                    </Typography>
                                )}
                            </Box>
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
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={processing}
                            sx={formBtnStyle}
                        >
                            Invia ordine
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            type="reset"
                            onClick={handleReset}
                            sx={formBtnStyle}
                        >
                            Azzera
                        </Button>
                    </Stack>
                </Box>
            </ContentContainer.Layout>
        </ContentContainer.Container>
    );
}

CreazioneOrdine.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
