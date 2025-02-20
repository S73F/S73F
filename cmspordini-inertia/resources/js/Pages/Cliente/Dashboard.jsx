import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/clienteDashboard.css";
import { Link, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { user } = usePage().props;

    return (
        <div id="main-container">
            <h2>Benvenuto {user.nome}</h2>

            <div id="btns-container">
                <Link href="/cliente/ordini/creazione">Nuovo ordine</Link>
                <Link href="/cliente/ordini/storico">Storico ordini</Link>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
