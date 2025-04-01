import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

/**
 * Hook personalizzato per gestire la tabella dello storico ordini.
 *
 * @returns {Object} Oggetto contenente lo stato del filtro e la funzione per aggiornarlo.
 * @returns {string|null} return.tempo - Valore selezionato per il filtro temporale.
 * @returns {Function} return.handleChange - Funzione per aggiornare il valore del filtro temporale.
 */
export const useStoricoOrdini = () => {
    // Stato per memorizzare il valore del filtro temporale
    const [tempo, setTempo] = useState(null);

    /**
     * Funzione per aggiornare il lasso di tempo quando cambia il valore selezionato.
     *
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setTempo(e.target.value);
    };

    // Effetto che si attiva ogni volta che cambia il valore di `tempo`
    useEffect(() => {
        if (tempo) {
            // Esegue una navigazione con Inertia per aggiornare la pagina
            router.visit(`/cliente/ordini/storico/${tempo}`, {
                only: ["ordini"], // Ricarica solo la parte relativa agli ordini, ottimizzando la richiesta
                preserveState: true, // Mantiene lo stato attuale della pagina
                preserveScroll: true, // Mantiene la posizione della pagina
                replace: true, // Sostituisce la cronologia della navigazione senza aggiungere una nuova voce
            });
        }
    }, [tempo]); // Dipendenza: l'effetto si attiva solo quando cambia il valore di "tempo"

    return { tempo, handleChange };
};
