import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
    const [tipoLavori, setTipoLavori] = useState("inCorso");
    const [numeroLavoriNuovi, setNumeroLavoriNuovi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/operatore/lavori/contatore-nuovi")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                setNumeroLavoriNuovi(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei lavori nuovi:", error);
                setNumeroLavoriNuovi(0);
            })
            .finally(() => setLoading(false));
    }, []);

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

    return {
        tipoLavori,
        setTipoLavori,
        handleFile,
        handleFileFinale,
        numeroLavoriNuovi,
        loading,
    };
};
