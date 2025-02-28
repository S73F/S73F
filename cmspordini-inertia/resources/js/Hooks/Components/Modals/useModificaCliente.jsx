import { useForm } from "@inertiajs/react";

export const useModificaCliente = ({ cliente, modalRef }) => {
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
        password: "*************",
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/operatore/gestione-clienti/modifica/${cliente.IDcliente}`, {
            onSuccess: () => closeModal(),
            onError: () => {
                console.log("Errore durante la modifica del cliente");
            },
        });
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    return {
        data,
        processing,
        placeholderData,
        handleChange,
        handleSubmit,
    };
};
