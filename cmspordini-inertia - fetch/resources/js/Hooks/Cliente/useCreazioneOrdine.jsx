import { useForm } from "@inertiajs/react";
import { useState } from "react";

export const useCreazioneOrdine = () => {
    const [editorKey, setEditorKey] = useState(0);

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
            preserveScroll: true,
            forceFormData: true, // Indica che c'è un file
        });
    };

    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    const handleReset = () => {
        setData({
            medico_ordinante: "",
            paziente_nome: "",
            paziente_cognome: "",
            indirizzo_spedizione: "",
            colore: "",
            data_cons: "",
            ora_cons: "",
            userfile: null,
        });

        setEditorKey((prevKey) => prevKey + 1);
    };

    return {
        data,
        setData,
        editorKey,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    };
};
