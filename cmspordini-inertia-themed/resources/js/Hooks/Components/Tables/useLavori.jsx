import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

export const useLavori = ({}) => {
    const handleFile = (IDordine) => {
        window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;

        setTimeout(() => {
            toast.success("Download del file in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    };

    const handleFileFinale = (IDordine) => {
        window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;

        setTimeout(() => {
            toast.success("Download del file finale in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    };

    function handleIncarico(IDordine, option = "forward") {
        router.patch(
            `/operatore/ordini-clienti/update/${IDordine}/${option}`,
            {},
            {
                only: ["lavori", "flash", "numLavoriNuovi"],
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

    return {
        handleFile,
        handleFileFinale,
        handleIncarico,
    };
};
