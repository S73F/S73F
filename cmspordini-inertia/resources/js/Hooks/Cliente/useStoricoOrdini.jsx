import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export const useStoricoOrdini = () => {
    const [tempo, setTempo] = useState(null);

    const handleChange = (e) => {
        setTempo(e.target.value);
    };

    useEffect(() => {
        if (tempo) {
            router.visit(`/cliente/ordini/storico/${tempo}`, {
                method: "get",
                preserveState: true,
            });
        }
    }, [tempo]);

    return { tempo, handleChange };
};
