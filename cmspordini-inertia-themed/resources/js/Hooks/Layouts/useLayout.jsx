import { useForm, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per la gestione del layout dell'applicazione.
 *
 * @returns {Object} Oggetto contenente le funzioni per gestire il drawer (menu laterale), i messaggi flash, e il logout.
 * @returns {Function} return.handleDrawerToggle - Funzione per gestire l'apertura e la chiusura del drawer (menu laterale).
 * @returns {boolean} return.open - Stato che indica se il drawer è aperto o chiuso.
 * @returns {Function} return.handleLogout - Funzione per effettuare il logout dell'utente.
 */

export const useLayout = () => {
    const [open, setOpen] = useState(false); // Stato per il controllo della visibilità del drawer (menu laterale)

    /**
     * Alterna l'apertura/chiusura del drawer (menu laterale).
     */
    const handleDrawerToggle = useCallback(() => {
        setOpen((prev) => !prev); // Cambia lo stato dell'apertura del drawer
    }, []);

    const { flash, user } = usePage().props; // Recupera i messaggi flash e l'utente dal server
    const { post } = useForm(); // Funzione per inviare i dati del form

    /**
     * Mostra tramite toast i messaggi flash e li rimuove dalla cronologia.
     */
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);

            history.replaceState({}, document.title); // Rimuove il messaggio dalla cronologia per evitare la ricomparsa al refresh
        }

        if (flash?.error) {
            toast.error(flash.error);
            history.replaceState({}, document.title);
        }

        if (flash?.validation_errors) {
            Object.values(flash.validation_errors).forEach((errors) => {
                errors.forEach((error) => {
                    toast.error(error);
                });
            });
            history.replaceState({}, document.title);
        }
    }, [flash]);

    /**
     * Esegue il logout dell'utente corrente.
     *
     * @param {Event} event - Evento del form di logout.
     */
    const handleLogout = useCallback(
        (event) => {
            event.preventDefault();

            // Esegue una richiesta POST per il logout, corrispondente al tipo di utente loggato
            user.IDcliente
                ? post("/cliente/logout")
                : user.IDoperatore
                ? post("/operatore/logout")
                : null;
        },
        [post, user]
    );

    return { handleDrawerToggle, open, setOpen, handleLogout };
};
