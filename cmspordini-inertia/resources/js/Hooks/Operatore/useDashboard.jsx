import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
    const [tipoLavori, setTipoLavori] = useState("inCorso");
    const [lavori, setLavori] = useState([]);
    const [numeroLavoriNuovi, setNumeroLavoriNuovi] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`/operatore/lavori/${tipoLavori}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Lavori ricevuti: ", data);
                setLavori(data.lavori);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [tipoLavori]);

    useEffect(() => {
        fetch(`/operatore/lavori/contatore-nuovi`)
            .then((response) => response.text())
            .then((data) => setNumeroLavoriNuovi(data))
            .catch((error) => console.log(error));
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

    function handleIncarico(IDordine, stato) {
        router.patch(
            `/operatore/ordini-clienti/update/${IDordine}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setLavori((prevLavori) => {
                        if (!prevLavori || prevLavori.length === 0) {
                            console.error("Dati non disponibili");
                            return prevLavori;
                        }

                        const updatedLavori = prevLavori.filter(
                            (row) => row.IDordine !== IDordine
                        );

                        if (stato === 0)
                            setNumeroLavoriNuovi(prevLavori.length - 1);

                        return updatedLavori;
                    });
                },
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    }

    return {
        tipoLavori,
        setTipoLavori,
        handleFile,
        handleFileFinale,
        handleIncarico,
        lavori,
        setLavori,
        numeroLavoriNuovi,
        loading,
    };
};
