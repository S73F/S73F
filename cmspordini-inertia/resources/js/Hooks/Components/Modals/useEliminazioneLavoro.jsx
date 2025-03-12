import { router } from "@inertiajs/react";

export const useEliminazioneLavoro = ({ IDordine, modalRef }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(`/operatore/lavori/eliminazione/${IDordine}`, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                router.visit("/operatore/dashboard");
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    return { handleDelete, closeModal };
};
