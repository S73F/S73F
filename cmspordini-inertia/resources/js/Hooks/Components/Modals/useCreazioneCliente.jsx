import { useForm } from "@inertiajs/react";

export const useCreazioneCliente = ({ modalRef }) => {
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

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/operatore/gestione-clienti/creazione", {
            forceFormData: true,
            onSuccess: () => closeModal(),
            onError: () => {
                console.log("Errore nella creazione del cliente");
            },
        });
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    return { data, processing, handleChange, handleSubmit };
};
