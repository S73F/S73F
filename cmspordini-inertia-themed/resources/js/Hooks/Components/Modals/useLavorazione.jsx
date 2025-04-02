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
    const [fileName, setFileName] = useState(""); // Stato per il nome del file selezionato

    // Inizializza il form con i dati della lavorazione
    const { setData, post, processing } = useForm({
        userfile: null,
        note_int: null,
    });

    /**
     * Gestisce il cambiamento del file selezionato.
     *
     * @param {Event} event - Evento del file input.
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0] || null;
        setFileName(file ? file.name : null);
        setData("userfile", file);
    };

    /**
     * Invia il form per caricare la lavorazione associata a un ordine.
     *
     * @param {Event} e - Evento del submit form.
     * @param {number|string} IDordine - ID dell'ordine da aggiornare.
     */
    const handleLavorazione = (e, IDordine) => {
        e.preventDefault();
        post(`/operatore/ordini-clienti/caricamento-lavorazione/${IDordine}`, {
            only: ["lavori", "flash"], // Aggiorna solo i dati necessari
            forceFormData: true, // Necessario per gestire l'upload del file
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
     * Salva il contenuto dell'editor Tiptap nel form.
     *
     * @param {string} tipo - Tipo di contenuto da salvare (es. "note_int").
     * @param {string} html - Contenuto HTML dell'editor.
     */
    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    /**
     * Chiude la modale di caricamento lavorazione in modo sicuro.
     */
    function closeModal() {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
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
