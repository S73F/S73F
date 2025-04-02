import React, { useCallback, useRef } from "react";
import { ActionModal } from "./ActionModal";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

export default function EliminazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    const { handleIncarico } = useLavori(); // Funzione utilizzata per spedire l'incarico

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
                action={() =>
                    handleIncarico(ordine, "forward", closeModal, [
                        "lavori",
                        "flash",
                    ])
                }
                closeModal={closeModal}
            />
        </ActionModal.Wrapper>
    );
}
