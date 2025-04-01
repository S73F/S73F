import { useForm } from "@inertiajs/react";
import { useState } from "react";

/**
 * Hook personalizzato per la gestione della lavorazione di un ordine.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} params.modalRef - Riferimento alla modale di caricamento lavorazione.
 * @returns {Object} Oggetto con le funzioni per gestire la lavorazione e lo stato.
 * @returns {string} return.fileName - Nome del file caricato, se presente.
 * @returns {Function} return.handleFileChange - Funzione per gestire il cambiamento del file selezionato.
 * @returns {Function} return.handleEditorContentSave - Funzione per salvare il contenuto dell'editor Tiptap.
 * @returns {Function} return.handleLavorazione - Funzione per inviare il form e caricare la lavorazione.
 * @returns {boolean} return.processing - Stato che indica se il form è in fase di elaborazione.
 * @returns {Function} return.closeModal - Funzione per chiudere la modale di caricamento lavorazione.
 */
export const useLavorazione = ({ modalRef }) => {
    // Stato per memorizzare il nome del file caricato
    const [fileName, setFileName] = useState("");

    // Inizializza il form con i dati della lavorazione
    const { setData, post, processing } = useForm({
        userfile: null,
        note_int: null,
    });

    /**
     * Funzione per aggiornare il campo "userfile" con il file selezionato.
     * @param {Event} event - Evento del file input.
     */
    const handleFile = (event) => {
        event.preventDefault();
        setData("userfile", event.target.files[0]);
    };

    /**
     * Funzione che gestisce il cambiamento del file selezionato.
     * @param {Event} event - Evento del file input.
     */
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("");
        }
        handleFile(event);
    };

    /**
     * Funzione per gestire l'invio del form e caricare la lavorazione.
     * @param {Event} e - Evento del submit form.
     * @param {number|string} IDordine - ID dell'ordine a cui associare la lavorazione.
     */
    const handleLavorazione = (e, IDordine) => {
        e.preventDefault();
        post(`/operatore/ordini-clienti/caricamento-lavorazione/${IDordine}`, {
            only: ["lavori", "flash"],
            forceFormData: true, // Indica che è presente un file
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                closeModal();
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    /**
     * Funzione per salvare il contenuto dell'editor Tiptap.
     * @param {string} tipo - Tipo di contenuto da salvare.
     * @param {string} html - Contenuto HTML dell'editor.
     */
    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    /**
     * Funzione per chiudere la modale di caricamento lavorazione.
     */
    function closeModal() {
        modalRef.current.close();
    }

    return {
        fileName,
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    };
};
