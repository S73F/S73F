import { useEffect, useState } from "react";

export const useModal = () => {
    const [modal, setModal] = useState({
        type: null,
        param: null,
    });

    const openModal = (type, param = null) => {
        setModal({ type, param });
    };

    const closeModal = () => {
        setModal({ type: null, param: null });
    };

    useEffect(() => {
        modal.type !== null
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
    }, [modal]);

    return {
        modal,
        openModal,
        closeModal,
    };
};
