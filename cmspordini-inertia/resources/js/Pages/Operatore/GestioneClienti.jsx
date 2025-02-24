import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import CreazioneCliente from "../../Components/CreazioneCliente";
import GestioneClientiTable from "../../Components/GestioneClientiTable";

export default function GestioneClienti({ clienti }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>
            <GestioneClientiTable clienti={clienti} />

            <button onClick={() => setIsModalOpen(true)}>Crea cliente</button>

            {isModalOpen && (
                <CreazioneCliente onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
