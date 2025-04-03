import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Content } from "../Content";
import { formBtnStack, formBtnStyle } from "../../styles/formStyles";
import { useCliente } from "../../Hooks/Components/Modals/useCliente";
import AzioneCliente from "./AzioneCliente";

/**
 * Componente per la modale di creazione di un nuovo cliente.
 *
 * Gestisce l'invio e la validazione del modulo per la creazione di un cliente.
 * Include campi per la ragione sociale, nome, cognome, partita IVA, indirizzo, città, CAP, provincia, email, username e password.
 *
 * @returns {JSX.Element} La UI del modulo per la creazione di un cliente.
 */
export default function CreazioneCliente({ cliente }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    return (
        <AzioneCliente
            action={"creazione"}
            cliente={cliente}
            modalRef={modalRef}
        />
    );
}
