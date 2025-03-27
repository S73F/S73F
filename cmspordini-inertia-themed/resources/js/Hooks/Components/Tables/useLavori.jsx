import { router } from "@inertiajs/react";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useLavori = () => {
    const handleFile = useCallback((user, tipo, IDordine) => {
        if (user === "operatore") {
            if (tipo === "sorgente") {
                window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;
            }
        }

        if (user === "cliente") {
            if (tipo === "sorgente") {
                window.location.href = `/cliente/ordini/download/${IDordine}`;
            } else if (tipo === "finale") {
                window.location.href = `/cliente/ordini/download-finale/${IDordine}`;
            }
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

    const handleIncarico = useCallback((IDordine, option = "forward") => {
        router.patch(
            `/operatore/ordini-clienti/update/${IDordine}/${option}`,
            {},
            {
                only: ["lavori", "flash", "numLavoriNuovi"],
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, []);

    return {
        handleFile,
        handleIncarico,
    };
};
