import { router, useForm } from "@inertiajs/react";

export const useLavorazione = ({ modalRef }) => {
    const { setData, post, processing } = useForm({
        userfile: null,
    });

    const handleFileChange = (e) => {
        e.preventDefault();
        setData("userfile", e.target.files[0]);
    };

    const handleLavorazione = (e, IDordine) => {
        e.preventDefault();
        post(`/operatore/ordini-clienti/caricamento-lavorazione/${IDordine}`, {
            forceFormData: true, // Indica che c'è un file
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    function closeModal() {
        modalRef.current.close();
    }

    return { handleFileChange, handleLavorazione, processing, closeModal };
};
