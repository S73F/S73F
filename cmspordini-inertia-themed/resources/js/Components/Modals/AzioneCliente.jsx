import React from "react";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Content } from "../Content";
import { formBtnStack, formBtnStyle } from "../../styles/formStyles";

/**
 * Componente modale per la gestione dei clienti.
 *
 * Questo componente permette la creazione e la modifica di un cliente tramite un modulo.
 * I campi del modulo includono informazioni come ragione sociale, nome, cognome, partita IVA, indirizzo,
 * città, CAP, provincia, email, username e password.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {React.Ref} props.modalRef - Riferimento alla modale.
 * @param {"creazione" | "modifica"} props.action - Azione da eseguire: "creazione" o "modifica".
 * @param {Object} props.data - Dati del cliente da inserire o modificare.
 * @param {Object} [props.placeholderData] - Dati placeholder da mostrare in caso di modifica.
 * @param {boolean} props.processing - Stato di elaborazione del modulo.
 * @param {Function} props.handleChange - Gestore per il cambiamento dei campi del modulo.
 * @param {Function} props.handleSubmit - Gestore per l'invio del modulo.
 * @param {Function} props.handleReset - Gestore per il reset dei campi del modulo.
 * @param {Function} props.closeModal - Funzione per chiudere la modale.
 *
 * @returns {JSX.Element} Modale con il modulo per la creazione o modifica di un cliente.
 */
export default function AzioneCliente({
    modalRef,
    action,
    data,
    placeholderData,
    processing,
    handleChange,
    handleSubmit,
    handleReset,
    closeModal,
}) {
    return (
        <Modal ref={modalRef}>
            {/* Titolo della modale */}
            <Content.Layout
                title={
                    action === "creazione"
                        ? "Creazione cliente"
                        : action === "modifica"
                        ? "Modifica cliente"
                        : ""
                }
            />

            {/* Contenuto della modale */}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.ragione_sociale,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.nome,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.cognome,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.partitaIVA,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.indirizzo,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.citta,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.cap,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.provincia,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.emailcliente,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.username,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
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
                            {...(action === "modifica" && {
                                placeholder: placeholderData?.password,
                            })}
                            {...(action === "creazione" && {
                                required: true,
                            })}
                            onChange={handleChange}
                        />
                    </Grid2>
                </Grid2>

                {/* Stack per i pulsanti del modulo */}
                <Stack sx={formBtnStack}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={processing}
                        sx={formBtnStyle}
                    >
                        {action === "creazione"
                            ? "Crea"
                            : action === "modifica"
                            ? "Modifica"
                            : ""}{" "}
                        cliente
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        type="reset"
                        onClick={handleReset}
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
