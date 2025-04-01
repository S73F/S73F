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
     * Funzione che gestisce l'apertura/chiusura del drawer (menu laterale).
     */
    const handleDrawerToggle = useCallback(() => {
        setOpen((prev) => !prev); // Cambia lo stato dell'apertura del drawer
    }, []);

    const { flash, user } = usePage().props; // Recupera i messaggi flash dal server
    const { post } = useForm(); // Funzione per inviare i dati del form

    useEffect(() => {
        // Gestisce i messaggi flash di successo
        if (flash?.success) {
            toast.success(flash.success);

            history.replaceState({}, document.title); // Rimuove il messaggio dalla cronologia per evitare la ricomparsa al refresh
        }

        // Gestisce i messaggi flash di errore
        if (flash?.error) {
            toast.error(flash.error);
            history.replaceState({}, document.title);
        }

        // Gestisce gli errori di validazione nei messaggi flash
        if (flash?.validation_errors) {
            Object.values(flash.validation_errors).forEach((errors) => {
                errors.forEach((error) => {
                    toast.error(error); // Mostra ogni errore individualmente
                });
            });
            history.replaceState({}, document.title);
        }
    }, [flash]); // Dipendenza: L'effetto viene rieseguito ogni volta che cambia il contenuto dei messaggi flash

    /**
     * Funzione per effettuare il logout dell'utente.
     *
     * @param {Event} event - L'evento di invio del form di logout.
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
