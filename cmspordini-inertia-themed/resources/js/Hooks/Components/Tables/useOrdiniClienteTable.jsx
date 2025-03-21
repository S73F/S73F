import { useCallback } from "react";
import { toast } from "react-toastify";

export const useOrdiniClientiTable = () => {
    const handleFile = useCallback((tipo, IDordine) => {
        if (tipo === "sorgente") {
            window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;
        } else if (tipo === "finale") {
            window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;
        }

        setTimeout(() => {
            toast.success("Download del file in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    }, []);

    return { handleFile };
};
