import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per gestire il login.
 *
 * @returns {Object} Oggetto contenente lo stato del form e le funzioni per gestirlo.
 * @returns {Object} return.data - Stato del form contenente i dati di login.
 * @returns {boolean} return.processing - Indica se la richiesta è in elaborazione.
 * @returns {Function} return.handleChange - Gestisce il cambiamento nei campi di input.
 * @returns {Function} return.handleSubmit - Gestisce l'invio del form.
 */
export const useLogin = () => {
    const { flash } = usePage().props; // Ottiene i messaggi flash dalla risposta del server

    // Effetto che ascolta i cambiamenti nei messaggi flash e mostra le notifiche
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Mostra un messaggio di successo
            history.replaceState({}, document.title); // Rimuove il messaggio dalla cronologia per evitare la ricomparsa al refresh
        }

        if (flash?.error) {
            toast.error(flash.error); // Mostra un messaggio di errore
            history.replaceState({}, document.title);
        }

        if (flash?.validation_errors) {
            // Se ci sono errori di validazione, li mostra come notifiche individuali
            Object.values(flash.validation_errors).forEach((errors) => {
                errors.forEach((error) => {
                    toast.error(error);
                });
            });
            history.replaceState({}, document.title);
        }
    }, [flash]); // L'effetto si attiva ogni volta che `flash` cambia

    // Inizializza il form con Inertia.js, con dati iniziali vuoti
    const { data, processing, setData, post } = useForm({
        username: "",
        password: "",
    });

    /**
     * Funzione per gestire il cambiamento dei campi del form.
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Funzione per gestire l'invio del form.
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene il comportamento predefinito del form

        // Controlla se i campi sono vuoti e mostra messaggi di errore appropriati
        !data.username && !data.password
            ? toast.error("I campi username e password sono obbligatori")
            : !data.username
            ? toast.error("Il campo username è obbligatorio")
            : !data.password
            ? toast.error("Il campo password è obbligatorio")
            : post("/login");
    };

    return { data, processing, handleChange, handleSubmit };
};
