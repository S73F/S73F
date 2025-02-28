import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export const useLavorazione = ({ onSuccess = () => {} }) => {
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
            onSuccess: () => onSuccess(),
            onError: (errors) => {
                console.log(errors);

                toast.error(errors.userfile);
                toast.error("Errore nel caricamento della lavorazione");
            },
        });
    };

    return { handleFileChange, handleLavorazione, processing };
};
