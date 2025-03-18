import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export const useLogin = () => {
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
