import { router } from "@inertiajs/react";

export const useEliminazioneOrdine = ({ ordine, stato, modalRef }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(`/operatore/lavori/eliminazione/${ordine}`, {
            only: ["lavori", "flash", "numLavoriNuovi"],
            preserveScroll: true,
            preserveState: true,
            data: { stato: stato },

            onSuccess: () => {
                closeModal();
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
