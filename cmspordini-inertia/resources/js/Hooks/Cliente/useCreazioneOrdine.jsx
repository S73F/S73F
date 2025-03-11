import { useForm } from "@inertiajs/react";

export const useCreazioneOrdine = () => {
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
        userfile: null,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("userfile", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/cliente/ordini/creazione", {
            forceFormData: true, // Indica che c'è un file
        });
    };

    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
        console.log(html);
    };

    return {
        data,
        setData,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        processing,
    };
};
