import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * Hook personalizzato per la gestione della creazione di un ordine.
 *
 * @returns {Object} Oggetto contenente lo stato del form e le funzioni per gestirlo.
 * @returns {Object} return.data - Stato del form contenente i dati dell'ordine.
 * @returns {Function} return.setData - Funzione per aggiornare i dati del form.
 * @returns {number} return.editorKey - Chiave dell'editor di testo Tiptap per forzarne il reset.
 * @returns {string} return.fileName - Nome del file caricato.
 * @returns {Function} return.handleChange - Gestisce il cambiamento nei campi di input.
 * @returns {Function} return.handleFileChange - Gestisce il caricamento di un file.
 * @returns {Function} return.handleSubmit - Gestisce l'invio del form.
 * @returns {Function} return.handleEditorContentSave - Salva il contenuto dell'editor nel form.
 * @returns {Function} return.handleReset - Resetta il form e forza il reset dell'editor.
 * @returns {boolean} return.processing - Indica se la richiesta è in elaborazione.
 */
export const useCreazioneOrdine = () => {
    // Stato per gestire la chiave dell'editor di testo Tiptap (utile per forzare un reset)
    const [editorKey, setEditorKey] = useState(0);
    // Stato per memorizzare il nome del file caricato
    const [fileName, setFileName] = useState("");

    // Inizializza il form con i dati dell'ordine
    const { data, setData, post, processing } = useForm({
        medico_ordinante: "",
        paziente_nome: "",
        paziente_cognome: "",
        indirizzo_spedizione: "",
        lavorazione: "",
        colore: "",
        data_cons: "",
        ora_cons: "",
        piattaforma: "",
        note: "",
        userfile: null, // Campo per il file allegato
    });

    /**
     * Funzione per gestire il cambiamento nei campi di input del form.
     * @param {Event} e - Evento del change input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Funzione per aggiornare il campo `userfile` con il file selezionato.
     * @param {Event} e - Evento del change input file.
     */
    const handleFile = (e) => {
        setData("userfile", e.target.files[0]);
    };

    /**
     * Funzione che gestisce il cambiamento del file selezionato.
     * @param {Event} event - Evento del change input file.
     */
    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name); // Salva il nome del file
        } else {
            setFileName(""); // Resetta il nome del file se non è selezionato
        }
        handleFile(event);
    };

    /**
     * Funzione per la gestione dell'invio del form.
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene il comportamento predefinito del form

        // Se il file è stato caricato, invia il form con i dati
        if (fileName) {
            post("/cliente/ordini/creazione", {
                preserveScroll: true, // Mantiene la posizione della pagina dopo l'invio
                forceFormData: true, // Indica che è presente un file
            });
        } else {
            toast.error("Il caricamento del file allegato è obbligatorio"); // Mostra un errore se manca il file
        }
    };

    /**
     * Funzione per salvare il contenuto dell'editor.
     * @param {string} tipo - Tipo di dato da salvare.
     * @param {string} html - Contenuto HTML da salvare.
     */
    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    /**
     * Funzione per resettare il form.
     */
    const handleReset = () => {
        setData({
            medico_ordinante: "",
            paziente_nome: "",
            paziente_cognome: "",
            indirizzo_spedizione: "",
            colore: "",
            data_cons: "",
            ora_cons: "",
            userfile: null, // Resetta il file allegato
        });

        // Incrementa la chiave dell'editor per forzarne il reset
        setEditorKey((prevKey) => prevKey + 1);
    };

    return {
        data,
        setData,
        editorKey,
        fileName,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    };
};
