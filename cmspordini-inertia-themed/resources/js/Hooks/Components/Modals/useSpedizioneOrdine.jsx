import { useCallback } from "react";
import { useLavori } from "../Tables/useLavori";

export const useSpedizioneOrdine = ({ ordine, modalRef }) => {
    const { handleIncarico } = useLavori();

    const handleSpedizione = useCallback((e) => {
        e.preventDefault();

        try {
            handleIncarico(ordine);
            closeModal();
        } catch (errors) {
            console.log(errors);
        }
    });

    /**
     * Chiude la modale di conferma eliminazione in modo sicuro.
     */
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return { handleSpedizione, closeModal };
};
