import axios from "axios";
import { useEffect, useState } from "react";

export const useDashboard = () => {
    const [tipoLavori, setTipoLavori] = useState("inCorso");
    const [numeroLavoriNuovi, setNumeroLavoriNuovi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/operatore/lavori/contatore-nuovi`, { withCredentials: true })
            .then(({ data }) => {
                setNumeroLavoriNuovi(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return {
        tipoLavori,
        setTipoLavori,
        numeroLavoriNuovi,
        setNumeroLavoriNuovi,
        loading,
    };
};
