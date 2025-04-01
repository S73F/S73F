import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";

/**
 * Hook personalizzato per la gestione della dashboard e dei lavori.
 *
 * @returns {Object} Oggetto contenente le funzioni e gli stati per gestire i lavori e il pulsante di caricamento.
 * @returns {Function} return.handleLavori - Funzione per gestire la visualizzazione dei lavori.
 * @returns {string|null} return.loadingButton - Stato che indica il tipo di lavoro in caricamento, o `null` se non c'è nessun lavoro in corso.
 */
export const useDashboard = () => {
    const [loadingButton, setLoadingButton] = useState(null); // Stato per memorizzare quale bottone è in caricamento

    /**
     * Funzione per gestire la selezione del tipo di lavori.
     *
     * @param {string} tipoLavori - Il tipo di lavori da visualizzare sulla dashboard.
     */
    const handleLavori = useCallback((tipoLavori) => {
        // Imposta il tipo di lavoro in caricamento (utile per il controllo di uno spinner o di un bottone)
        setLoadingButton(tipoLavori);

        // Naviga verso la pagina della dashboard con i dati relativi al tipo di lavoro selezionato
        router.visit(`/operatore/dashboard`, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            data: { tipo: tipoLavori }, // Passa il tipo di lavori come parametro alla pagina
            only: ["tipo", "lavori"], // Limita l'aggiornamento dei dati alle proprietà "tipo" e "lavori", evitando il ricaricamento dell'intera pagina
            onFinish: () => setLoadingButton(null),
        });
    }, []); // La funzione viene memorizzata per evitare che venga ricreata ad ogni render

    return {
        handleLavori,
        loadingButton,
    };
};
