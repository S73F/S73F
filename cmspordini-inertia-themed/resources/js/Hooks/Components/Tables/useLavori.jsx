import { router } from "@inertiajs/react";
import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per la gestione dei lavori.
 *
 * @returns {Object} Oggetto contenente le funzioni per gestire il download dei file e l'assegnazione degli incarichi.
 * @returns {Function} return.handleFile - Funzione per gestire il download dei file.
 * @returns {Function} return.handleIncarico - Funzione per gestire l'assegnazione o la riassegnazione di un incarico.
 */
export const useLavori = () => {
    /**
     * Funzione per gestire il download dei file.
     *
     * @param {string} user - Tipo di utente ("operatore" o "cliente").
     * @param {string} tipo - Tipo di file da scaricare ("sorgente" o "finale").
     * @param {number} IDordine - ID dell'ordine associato al file.
     */
    const handleFile = useCallback((user, tipo, IDordine) => {
        if (user === "operatore") {
            if (tipo === "sorgente") {
                window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;
            }
        }

        if (user === "cliente") {
            if (tipo === "sorgente") {
                window.location.href = `/cliente/ordini/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/cliente/ordini/download-finale/${IDordine}`;
            }
        }

        setTimeout(() => {
            toast.success("Download del file in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    }, []);

    /**
     * Funzione per gestire l'assegnazione o la riassegnazione di un incarico.
     *
     * @param {number} IDordine - ID dell'ordine.
     * @param {string} [option="forward"] - Opzione per l'assegnazione (default: "forward").
     */
    const handleIncarico = useCallback((IDordine, option = "forward") => {
        router.patch(
            `/operatore/ordini-clienti/update/${IDordine}/${option}`,
            {},
            {
                only: ["lavori", "flash", "numLavoriNuovi"],
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, []);

    return {
        handleFile,
        handleIncarico,
    };
};
