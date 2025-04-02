import React, { useRef } from "react";
import { useSpedizioneOrdine } from "../../Hooks/Components/Modals/useSpedizioneOrdine";
import { ActionModal } from "./ActionModal";

export default function EliminazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    // Funzioni per la gestione della spedizione dell'ordine e chiusura della modale
    const { handleSpedizione, closeModal } = useSpedizioneOrdine({
        ordine,
        modalRef,
    });

    return (
        <ActionModal.Wrapper modalRef={modalRef} title={"Spedizione ordine"}>
            <ActionModal.Message>
                Sei sicuro di voler spedire la lavorazione?
            </ActionModal.Message>

            <ActionModal.Reminder>
                ATTENZIONE: una volta spedito, l'ordine non potrà più essere
                ritirato
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={handleSpedizione}
                closeModal={closeModal}
            />
        </ActionModal.Wrapper>
    );
}
