import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useLayout = () => {
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

    return { handleLogout };
};
