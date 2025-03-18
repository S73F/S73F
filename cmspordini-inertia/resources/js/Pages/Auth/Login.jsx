import React from "react";
import "../../../css/login.css";
import Layout from "../../Layouts/Layout";
import { useLogin } from "../../Hooks/Auth/useLogin";

export default function Login() {
    const { data, processing, handleChange, handleSubmit } = useLogin();

    return (
        <div className="login-container">
            <img src="/assets/img/ODONTOTECNICA-LOGO.svg" />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button type="submit" disabled={processing}>
                    Login
                </button>
            </form>
        </div>
    );
}

Login.layout = (page) => <Layout>{page}</Layout>;
