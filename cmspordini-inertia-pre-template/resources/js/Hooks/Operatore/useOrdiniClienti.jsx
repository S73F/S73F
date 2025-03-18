import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export const useOrdiniClienti = () => {
    const [clienteID, setClienteID] = useState(null);

    const handleChange = (e) => {
        setClienteID(e.target.value);
    };

    useEffect(() => {
        if (clienteID) {
            router.visit(`/operatore/ordini-clienti/${clienteID}`, {
                only: ["ordini"],
                preserveState: true,
                replace: true,
            });
        }
    }, [clienteID]);

    return { handleChange };
};
