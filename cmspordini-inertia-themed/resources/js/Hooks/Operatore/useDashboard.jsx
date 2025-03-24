import { router } from "@inertiajs/react";
import { useState, useCallback } from "react";

export const useDashboard = () => {
    const [loadingButton, setLoadingButton] = useState(null);

    const handleLavori = useCallback((tipoLavori) => {
        setLoadingButton(tipoLavori);

        router.visit(`/operatore/dashboard`, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            data: { tipo: tipoLavori },
            only: ["tipo", "lavori"],
            onFinish: () => setLoadingButton(null),
        });
    }, []);

    return {
        handleLavori,
        loadingButton,
    };
};
