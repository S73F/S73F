import { router } from "@inertiajs/react";

/**
 * Hook personalizzato per gestire l'eliminazione di un cliente.
 *
 * @param {Object} params - Oggetto contenente i parametri necessari.
 * @param {Object} params.cliente - Dati del cliente da eliminare.
 * @param {Object} params.modalRef - Riferimento alla modale di conferma eliminazione.
 * @returns {Object} Oggetto con le funzioni per eliminare il cliente e chiudere il modale.
 */
export const useEliminazioneCliente = ({ cliente, modalRef }) => {
    /**
     * Funzione per eliminare un cliente effettuando una richiesta DELETE al server.
     * @param {Event} e - Evento del form.
     */
    const handleDelete = (e) => {
        e.preventDefault();

        // Effettua la richiesta DELETE utilizzando Inertia.js
        router.delete(
            `/operatore/gestione-clienti/eliminazione/${cliente.IDcliente}`,
            {
                only: ["clienti", "flash"], // Aggiorna solo la lista clienti e i messaggi flash
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => closeModal(), // Chiude la modale in caso di successo.
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    /**
     * Chiude la modale accedendo direttamente al suo elemento DOM tramite il riferimento "modalRef".
     */
    const closeModal = () => {
        modalRef.current.close();
    };

    return { handleDelete, closeModal };
};
