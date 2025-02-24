import React from "react";
import { useForm } from "@inertiajs/react";
import "../../../css/login.css";
import Layout from "../../Layouts/Layout";

export default function Login() {
    const { data, setData, post } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div className="login-container">
            <img src="assets/img/ODONTOTECNICA-LOGO.svg" />

            <form onSubmit={submit}>
                <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                    placeholder="Username"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="Password"
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

Login.layout = (page) => <Layout>{page}</Layout>;
