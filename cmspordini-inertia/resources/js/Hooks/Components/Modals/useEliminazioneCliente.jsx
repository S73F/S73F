import { router } from "@inertiajs/react";

export const useEliminazioneCliente = ({ cliente, modalRef }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(
            `/operatore/gestione-clienti/eliminazione/${cliente.IDcliente}`,
            {
                only: ["clienti", "flash"],
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    console.log(errors);
                },
            }
        );
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    return { handleDelete, closeModal };
};
