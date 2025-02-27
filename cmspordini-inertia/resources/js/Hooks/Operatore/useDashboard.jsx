import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
    const [tipoLavori, setTipoLavori] = useState("inCorso");

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

    const handleIncarico = (IDordine) => {
        router.patch(`/operatore/ordini-clienti/update/${IDordine}`);
    };

    return {
        tipoLavori,
        setTipoLavori,
        handleFile,
        handleIncarico,
    };
};
