import React, { useRef } from "react";
import { useModificaCliente } from "../../Hooks/Components/Modals/useModificaCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";
import { Box, Button, Grid2, Stack, TextField } from "@mui/material";
import { Content } from "../Content";
import { formBtnStack, formBtnStyle } from "../../styles/formStyles";
import { useCliente } from "../../Hooks/Components/Modals/useCliente";
import AzioneCliente from "./AzioneCliente";

/**
 * Componente per la gestione della modale di modifica di un cliente.
 *
 * Permette all'utente di aggiornare i dettagli del cliente esistente.
 * I dati esistenti sono precompilati nel modulo, e l'utente può modificarli.
 *
 * @param {Object} cliente - Dati del cliente da modificare.
 * @returns {JSX.Element} La UI per la modifica dei dettagli del cliente.
 */
export default function ModificaCliente({ cliente }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    return (
        <AzioneCliente
            action={"modifica"}
            cliente={cliente}
            modalRef={modalRef}
        />
    );
}
