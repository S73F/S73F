import { router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export const useLavorazione = ({ modalRef }) => {
    const { setData, post, processing } = useForm({
        userfile: null,
        note_int: null,
    });

    const handleFileChange = (e) => {
        e.preventDefault();
        setData("userfile", e.target.files[0]);
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
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    };
};
