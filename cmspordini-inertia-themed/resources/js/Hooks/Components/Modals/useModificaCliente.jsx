import { useForm } from "@inertiajs/react";

/**
 * Hook personalizzato per la modifica di un cliente.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} params.cliente - Dati del cliente da modificare.
 * @param {Object} params.modalRef - Riferimento alla modale di modifica cliente.
 * @returns {Object} Oggetto con le funzioni per gestire la modifica del cliente e lo stato.
 * @returns {Object} return.data - I dati del form.
 * @returns {Function} return.handleChange - Funzione per gestire il cambiamento dei campi del form.
 * @returns {Function} return.handleSubmit - Funzione per inviare il form e aggiornare i dati del cliente.
 * @returns {Function} return.handleDelete - Funzione per resettare i dati del form.
 * @returns {Function} return.closeModal - Funzione per chiudere la modale di modifica cliente.
 * @returns {boolean} return.processing - Stato che indica se il form è in fase di elaborazione.
 * @returns {Object} return.placeholderData - Dati placeholder per il cliente, usati per precompilare il form.
 */
export const useModificaCliente = ({ cliente, modalRef }) => {
    // Inizializza il form con i dati del cliente
    const { data, setData, patch, processing } = useForm({
        ragione_sociale: "",
        nome: "",
        cognome: "",
        partitaIVA: "",
        indirizzo: "",
        citta: "",
        cap: "",
        provincia: "",
        emailcliente: "",
        username: "",
        password: "",
    });

    // Dati placeholder basati sulle informazioni attuali del cliente
    const placeholderData = {
        ragione_sociale: cliente.ragione_sociale || "",
        nome: cliente.nome || "",
        cognome: cliente.cognome || "",
        partitaIVA: cliente.partitaIVA || "",
        indirizzo: cliente.indirizzo || "",
        citta: cliente.citta || "",
        cap: cliente.cap || "",
        provincia: cliente.provincia || "",
        emailcliente: cliente.emailcliente || "",
        username: cliente.username || "",
        password: "*************", // La password viene tralasciata per motivi di privacy
    };

    /**
     * Funzione per gestire il cambiamento dei campi del form.
     * @param {Event} e - Evento dell'input.
     */
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    /**
     * Funzione per inviare il form e aggiornare i dati del cliente.
     * @param {Event} e - Evento del submit form.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/operatore/gestione-clienti/modifica/${cliente.IDcliente}`, {
            only: ["clienti", "flash"],
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(),
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    /**
     * Funzione per resettare i dati del form.
     */
    const handleDelete = () => {
        setData({
            ragione_sociale: "",
            nome: "",
            cognome: "",
            partitaIVA: "",
            indirizzo: "",
            citta: "",
            cap: "",
            provincia: "",
            emailcliente: "",
            username: "",
            password: "",
        });
    };

    /**
     * Funzione per chiudere la modale di modifica cliente.
     */
    const closeModal = () => {
        modalRef.current.close();
    };

    return {
        data,
        processing,
        placeholderData,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    };
};
