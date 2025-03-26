import React, { useState } from "react";
import "../../../css/creazioneOrdine.css";
import { useCreazioneOrdine } from "../../Hooks/Cliente/useCreazioneOrdine";
import Tiptap from "../../Components/Tiptap";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { ContentContainer } from "../../Components/ContentContainer";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";

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
                        rowSpacing={4}
                        columnSpacing={{ xs: 1, md: 2, md: 3 }}
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
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
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
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        File selezionato: {fileName}
                                    </Typography>
                                )}
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={processing}
                                sx={{ height: 50 }}
                            >
                                Invia ordine
                            </Button>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                type="reset"
                                onClick={handleReset}
                                sx={{ height: 50 }}
                            >
                                Azzera
                            </Button>
                        </Grid2>
                    </Grid2>
                </Box>
            </ContentContainer.Layout>
        </ContentContainer.Container>
    );
}

CreazioneOrdine.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
