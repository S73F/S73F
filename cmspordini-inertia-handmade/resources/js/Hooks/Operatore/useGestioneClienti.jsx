import { useCallback, useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export const useGestioneClienti = () => {
    // const [modal, setModal] = useState({
    //     type: null,
    //     cliente: null,
    // });

    // const openModal = (type, cliente = null) => {
    //     setModal({ type, cliente });
    // };

    // const closeModal = () => {
    //     setModal({ type: null, cliente: null });
    // };

    const handleDelete = useCallback((IDcliente) => {
        router.delete(`/operatore/gestione-clienti/cancellazione/${IDcliente}`);
    });

    // useEffect(() => {
    //     modal.type !== null
    //         ? (document.body.style.overflow = "hidden")
    //         : (document.body.style.overflow = "auto");
    // }, [modal]);

    return {
        // modal,
        // openModal,
        // closeModal,
        handleDelete,
    };
};
