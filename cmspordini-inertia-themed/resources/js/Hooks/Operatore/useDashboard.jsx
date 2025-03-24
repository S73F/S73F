import { router } from "@inertiajs/react";
import { useState } from "react";

export const useDashboard = () => {
    const [loadingButton, setLoadingButton] = useState(null);

    const handleLavori = (tipoLavori) => {
        router.on("start", (event) => {
            setLoadingButton(tipoLavori);
        });

        router.on("finish", (event) => {
            setLoadingButton(null);
        });

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
        loadingButton,
    };
};
