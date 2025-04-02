import React, { useCallback, useRef } from "react";
import { ActionModal } from "./ActionModal";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

export default function AccettazioneOrdine({ ordine }) {
    const modalRef = useRef(null); // Riferimento alla modale per controllarne l'apertura/chiusura

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    const { handleIncarico } = useLavori(); // Funzione utilizzata per accettare l'incarico

    return (
        <ActionModal.Wrapper
            modalRef={modalRef}
            title={"Presa in carico ordine"}
        >
            <ActionModal.Message>
                Sei sicuro di prendere in carico l'ordine?
            </ActionModal.Message>

            <ActionModal.Reminder color="primary">
                Una volta accettato, potrai comunque ripristinarlo.
            </ActionModal.Reminder>

            <ActionModal.Buttons
                action={() => handleIncarico(ordine, "forward", closeModal)}
                closeModal={closeModal}
            />
        </ActionModal.Wrapper>
    );
}
