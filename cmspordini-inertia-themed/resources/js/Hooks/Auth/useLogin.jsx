import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useLogin = () => {
    const { flash } = usePage().props;

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

    const { data, processing, setData, post } = useForm({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        data.username !== "" && data.password !== ""
            ? post("/login")
            : data.username === "" && data.password !== ""
            ? toast.error("Il campo username è obbligatorio")
            : data.username !== "" && data.password === ""
            ? toast.error("Il campo password è obbligatorio")
            : toast.error("I campi username e password sono obbligatori");
    };

    return { data, processing, handleChange, handleSubmit };
};
