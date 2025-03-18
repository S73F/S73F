import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";

export default function GestioneClienti({ clienti }) {
    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>

            <GestioneClientiTable clienti={clienti} />
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
