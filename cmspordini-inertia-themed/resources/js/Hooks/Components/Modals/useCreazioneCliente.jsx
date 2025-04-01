import { useForm } from "@inertiajs/react";

/**
 * Hook personalizzato per la creazione di un cliente.
 *
 * @param {Object} params - Parametri del hook.
 * @param {Object} params.modalRef - Riferimento alla modale di creazione cliente.
 * @returns {Object} Oggetto con funzioni per gestire il form del cliente.
 * @returns {Object} return.data - Stato del form contenente i dati del cliente.
 * @returns {boolean} return.processing - Indica se la richiesta è in elaborazione.
 * @returns {Function} return.handleChange - Gestisce il cambiamento dei campi del form.
 * @returns {Function} return.handleSubmit - Invia il form per creare un nuovo cliente.
 * @returns {Function} return.handleDelete - Resetta i dati del form.
 * @returns {Function} return.closeModal - Chiude la modale di creazione cliente.
 */
export const useCreazioneCliente = ({ modalRef }) => {
    // Stato del form gestito con useForm di Inertia
    const { data, setData, post, processing } = useForm({
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

    // Funzione per gestire il cambiamento dei campi del form
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Funzione per inviare il form e creare un nuovo cliente
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/operatore/gestione-clienti/creazione", {
            only: ["clienti", "flash"], // Ricarica solo i dati relativi ai clienti e ai messaggi flash
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => closeModal(), // Chiude la modale al successo della richiesta
            onError: () => {
                console.log("Errore nella creazione del cliente");
            },
        });
    };

    // Funzione per resettare i dati del form
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

    // Funzione per chiudere la modale di creazione cliente
    const closeModal = () => {
        modalRef.current.close(); // Chiude la modale facendo riferimento al suo elemento nel DOM
    };

    return {
        data,
        processing,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    };
};
