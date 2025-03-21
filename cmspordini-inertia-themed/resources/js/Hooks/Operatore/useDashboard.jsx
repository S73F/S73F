import { router } from "@inertiajs/react";

export const useDashboard = () => {
    const handleLavori = (tipoLavori) => {
        router.visit(`/operatore/dashboard`, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            data: { tipo: tipoLavori },
            only: ["tipo", "lavori"],
        });
    };

    return {
        handleLavori,
    };
};
