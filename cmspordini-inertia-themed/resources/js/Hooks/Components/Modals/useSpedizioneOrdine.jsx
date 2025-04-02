import { useCallback } from "react";
import { useLavori } from "../Tables/useLavori";

export const useSpedizioneOrdine = ({ ordine, modalRef }) => {
    const { handleIncarico } = useLavori();

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = useCallback(() => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    }, [modalRef]);

    /**
     * Gestisce la spedizione dell'ordine.
     *
     * @param {Event} e - L'evento di submit del pulsante.
     */
    const handleSpedizione = useCallback(
        (e) => {
            e.preventDefault();

            try {
                handleIncarico(ordine, "forward", ["lavori", "flash"]);
                closeModal();
            } catch (errors) {
                console.log(errors);
            }
        },
        [handleIncarico, ordine, closeModal]
    );

    return { handleSpedizione, closeModal };
};
