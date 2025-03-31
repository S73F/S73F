import { useForm, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLayout = () => {
    const [open, setOpen] = useState(false); // Stato per il controllo della visibilità del drawer (menu laterale)

    // Funzione che gestisce l'apertura/chiusura del drawer
    const handleDrawerToggle = useCallback(() => {
        setOpen((prev) => !prev); // Cambia lo stato dell'apertura del drawer
    }, []);

    const { flash } = usePage().props;
    const { post } = useForm();

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            history.replaceState({}, document.title);
        }

        if (flash?.error) {
            toast.error(flash.error);
            history.replaceState({}, document.title);
        }

        if (flash?.validation_errors) {
            Object.values(flash.validation_errors).forEach((errors) => {
                errors.forEach((error) => {
                    toast.error(error);
                });
            });
            history.replaceState({}, document.title);
        }
    }, [flash]);

    const handleLogout = (event) => {
        event.preventDefault();
        post("/logout");
    };

    return { handleDrawerToggle, open, setOpen, handleLogout };
};
