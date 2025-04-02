import { Modal } from "@inertiaui/modal-react";
import React from "react";
import { Content } from "../Content";
import { Box, Button, Stack, Typography } from "@mui/material";
import { formBtnStyle } from "../../styles/formStyles";

/**
 * Componente wrapper per una modale d'azione.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.RefObject} props.modalRef - Riferimento alla modale per la gestione dell'apertura e chiusura.
 * @param {string} props.title - Titolo della modale.
 * @param {React.ReactNode} props.children - Contenuto della modale.
 *
 * @returns {JSX.Element} Il componente modale con titolo e contenuto.
 */
const Wrapper = ({ modalRef, title, children }) => {
    return (
        <Modal ref={modalRef}>
            <Content.Layout title={title} />

            <Box sx={{ textAlign: "center" }}>{children}</Box>
        </Modal>
    );
};

/**
 * Componente per visualizzare un messaggio all'interno della modale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.ReactNode} props.children - Contenuto del messaggio.
 *
 * @returns {JSX.Element} Il contenitore del messaggio.
 */
const Message = ({ children }) => {
    return <Typography sx={{ mb: 1 }}>{children}</Typography>;
};

/**
 * Componente per visualizzare un messaggio di avviso o promemoria con un colore personalizzato.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {React.ReactNode} props.children - Contenuto del messaggio di avviso.
 * @param {string} [props.color="error"] - Colore del testo (default: "error").
 *
 * @returns {JSX.Element} Il messaggio evidenziato con il colore specificato.
 */
const Reminder = ({ children, color = "error" }) => {
    return (
        <Typography color={color} fontWeight="500" mb={3}>
            {children}
        </Typography>
    );
};

/**
 * Componente per i pulsanti di azione all'interno della modale.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Function} props.action - Funzione da eseguire quando l'utente conferma l'azione (cliccando "Si").
 * @param {Function} props.closeModal - Funzione per chiudere la modale (cliccando "No").
 * @param {string} [props.color="error"] - Colore del pulsante di conferma (default: "error").
 *
 * @returns {JSX.Element} Un set di due pulsanti: uno per confermare e uno per annullare l'azione.
 */
const Buttons = ({ action, closeModal, color = "error" }) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 3 }}
            justifyContent="center"
        >
            <Button
                variant="contained"
                color={color}
                onClick={action}
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
    );
};

/**
 * Oggetto che raccoglie i componenti della modale d'azione.
 */
export const ActionModal = {
    Wrapper,
    Message,
    Reminder,
    Buttons,
};
