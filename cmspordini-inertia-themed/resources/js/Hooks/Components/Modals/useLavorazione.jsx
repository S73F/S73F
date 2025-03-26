import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useLavorazione = ({ modalRef }) => {
    const [fileName, setFileName] = useState("");

    const { setData, post, processing } = useForm({
        userfile: null,
        note_int: null,
    });

    const handleFile = (event) => {
        event.preventDefault();
        setData("userfile", event.target.files[0]);
    };

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
        } else {
            setFileName("");
        }
        handleFile(event);
    };

    const handleLavorazione = (e, IDordine) => {
        e.preventDefault();
        post(`/operatore/ordini-clienti/caricamento-lavorazione/${IDordine}`, {
            only: ["lavori", "flash"],
            forceFormData: true, // Indica che c'è un file
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                closeModal();
            },
            onError: (error) => {
                console.log(error);
            },
        });
    };

    const handleEditorContentSave = (tipo, html) => {
        setData(tipo, html);
    };

    function closeModal() {
        modalRef.current.close();
    }

    return {
        fileName,
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    };
};
