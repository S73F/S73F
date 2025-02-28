import { useForm } from "@inertiajs/react";

export const useCreazioneCliente = ({ onSuccess = () => {} }) => {
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
        post("/operatore/gestione-clienti", {
            forceFormData: true,
            onSuccess: () => onSuccess(),
            onError: () => {
                console.log("Errore nella creazione del cliente");
            },
        });
    };

    return { data, processing, handleChange, handleSubmit };
};
