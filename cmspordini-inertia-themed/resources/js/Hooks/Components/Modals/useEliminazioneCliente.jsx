import { router } from "@inertiajs/react";

/**
 * Hook personalizzato per gestire l'eliminazione di un cliente.
 *
 * @param {Object} params - Oggetto contenente i parametri necessari.
 * @param {Object} params.cliente - Dati del cliente da eliminare.
 * @param {Object} params.modalRef - Riferimento alla modale di conferma eliminazione.
 * @returns {Object} Oggetto con le funzioni per eliminare il cliente e chiudere il modale.
 * @returns {Function} return.handleDelete - Funzione per eliminare il cliente.
 * @returns {Function} return.closeModal - Funzione per chiudere il modale di conferma eliminazione.
 */
export const useEliminazioneCliente = ({ cliente, modalRef }) => {
    /**
     * Effettua una richiesta DELETE per eliminare il cliente.
     *
     * @param {Event} e - Evento del submit form.
     */
    const handleDelete = (e) => {
        e.preventDefault();

        router.delete(
            `/operatore/gestione-clienti/eliminazione/${cliente.IDcliente}`,
            {
                only: ["clienti", "flash"], // Aggiorna solo la lista clienti e i messaggi flash
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    /**
     * Chiude la modale di conferma eliminazione.
     */
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return { handleDelete, closeModal };
};
