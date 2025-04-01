import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

/**
 * Hook personalizzato per gestire la visualizzazione degli ordini per un cliente.
 *
 * @returns {Object} Oggetto contenente la funzione per gestire il cambiamento del cliente selezionato.
 * @returns {Function} return.handleChange - Funzione per gestire il cambiamento del cliente selezionato.
 */
export const useOrdiniClienti = () => {
    const [clienteID, setClienteID] = useState(null); // Stato per memorizzare l'ID del cliente selezionato

    /**
     * Funzione per gestire il cambiamento del cliente selezionato.
     * @param {Event} e - Evento del campo di selezione del cliente.
     */
    const handleChange = (e) => {
        setClienteID(e.target.value); // Aggiorna lo stato con l'ID del cliente selezionato
    };

    // Effetto che viene eseguito quando l'ID del cliente cambia
    useEffect(() => {
        if (clienteID) {
            // Esegue una visita alla pagina degli ordini del cliente selezionato
            router.visit(`/operatore/ordini-clienti/${clienteID}`, {
                only: ["ordini"],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    }, [clienteID]); // Dipendenza: l'effetto viene eseguito quando l'ID del cliente cambia

    return { handleChange };
};
