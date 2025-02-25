import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import CreazioneCliente from "../../Components/CreazioneCliente";
import GestioneClientiTable from "../../Components/GestioneClientiTable";
import Pagination from "../../Components/Pagination";

export default function GestioneClienti({ clienti }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>

            <button
                id="add-cliente-btn"
                onClick={() => setIsModalOpen(true)}
                title="Aggiungi cliente"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                {/* Aggiungi cliente */}
            </button>

            <GestioneClientiTable clienti={clienti.data} />
            {clienti.links?.length > 1 && <Pagination links={clienti.links} />}

            {isModalOpen && (
                <CreazioneCliente onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
