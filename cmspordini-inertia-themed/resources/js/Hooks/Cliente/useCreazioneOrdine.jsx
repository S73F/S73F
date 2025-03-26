import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useCreazioneOrdine = () => {
    const [editorKey, setEditorKey] = useState(0);
    const [fileName, setFileName] = useState("");

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

    const handleFile = (e) => {
        setData("userfile", e.target.files[0]);
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("");
        }
        handleFile(event);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileName) {
            post("/cliente/ordini/creazione", {
                preserveScroll: true,
                forceFormData: true, // Indica che c'è un file
            });
        } else {
            toast.error("Il caricamento del file allegato è obbligatorio");
        }
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
        fileName,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        handleReset,
        processing,
    };
};
