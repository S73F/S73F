import { useForm } from "@inertiajs/react";

// Hook personalizzato per la creazione di un cliente
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
