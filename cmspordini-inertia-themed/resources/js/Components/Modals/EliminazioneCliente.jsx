import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useEliminazioneCliente } from "../../Hooks/Components/Modals/useEliminazioneCliente";
import "../../../css/modal.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Content } from "../Content";
import { formBtnStyle } from "../../styles/formStyles";
import { ActionModal } from "./ActionModal";

/**
 * Componente per la modale di eliminazione di un cliente.
 *
 * Gestisce la conferma dell'eliminazione di un cliente.
 * L'eliminazione è irreversibile.
 *
 * @param {Object} cliente - Dati del cliente che si vuole eliminare.
 * @returns {JSX.Element} La UI per la conferma dell'eliminazione di un cliente.
 */
export default function EliminazioneCliente({ cliente }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Funzioni per la gestione dell'eliminazione e chiusura della modale
    const { handleDelete, closeModal } = useEliminazioneCliente({
        cliente,
        modalRef,
    });

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Eliminazione cliente"}>
            <ActionModal.Message>
                Sei sicuro di voler eliminare{" "}
                <Typography component="span" sx={{ fontWeight: 500 }}>
                    {cliente.ragione_sociale}
                </Typography>
                ?
            </ActionModal.Message>

            <ActionModal.Reminder>
                ATTENZIONE: l'eliminazione del cliente non è reversibile
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={handleDelete}
                closeModal={closeModal}
            />
        </ActionModal.Wrapper>
    );
}
