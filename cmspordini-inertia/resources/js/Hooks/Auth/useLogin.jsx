import { useForm } from "@inertiajs/react";

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
        post("/login");
    };

    return { data, processing, handleChange, handleSubmit };
};
