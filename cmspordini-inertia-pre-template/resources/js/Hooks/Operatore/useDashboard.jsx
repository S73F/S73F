import { router } from "@inertiajs/react";

export const useDashboard = () => {
    const handleLavori = (tipo) => {
        router.visit(`/operatore/dashboard`, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            data: { tipo: tipo },
            only: ["tipo", "lavori"],
        });
    };

    return {
        handleLavori,
    };
};
