import { router } from "@inertiajs/react";

/**
 * Hook personalizzato per l'eliminazione di un ordine.
 *
 * @param {Object} params - Parametri del hook.
 * @param {number|string} params.ordine - ID dell'ordine da eliminare.
 * @param {string} params.stato - Stato attuale dell'ordine.
 * @param {Object} params.modalRef - Riferimento alla modale per la conferma eliminazione.
 * @returns {Object} Oggetto con le funzioni per eliminare l'ordine e chiudere la modale.
 * @returns {Function} return.handleDelete - Funzione per eliminare l'ordine.
 * @returns {Function} return.closeModal - Funzione per chiudere la modale di conferma eliminazione.
 */
export const useEliminazioneOrdine = ({ ordine, stato, modalRef }) => {
    /**
     * Funzione per eliminare un ordine.
     * @param {Event} e - Evento del submit form.
     */
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(`/operatore/lavori/eliminazione/${ordine}`, {
            only: ["lavori", "flash", "numLavoriNuovi"],
            preserveScroll: true,
            preserveState: true,
            data: { stato: stato },

            onSuccess: () => {
                closeModal();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    /**
     * Funzione per chiudere la modale di conferma eliminazione.
     */
    const closeModal = () => {
        modalRef.current.close();
    };

    return { handleDelete, closeModal };
};
