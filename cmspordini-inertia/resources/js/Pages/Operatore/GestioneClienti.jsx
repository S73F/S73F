import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import CreazioneCliente from "../../Components/CreazioneCliente";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import ModificaCliente from "../../Components/ModificaCliente";
import { router } from "@inertiajs/react";

export default function GestioneClienti({ clienti }) {
    const [isAddingModalOpen, setIsAddingModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);

    const handleEdit = (cliente) => {
        setSelectedCliente(cliente);
        setIsEditModalOpen(true);
    };

    const handleDelete = (IDcliente) => {
        router.delete(`/operatore/gestione-clienti/cancellazione/${IDcliente}`);
    };

    useEffect(() => {
        isAddingModalOpen || isEditModalOpen
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
    }, [isAddingModalOpen, isEditModalOpen]);

    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>

            <button
                id="add-cliente-btn"
                onClick={() => setIsAddingModalOpen(true)}
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

            <GestioneClientiTable
                clienti={clienti}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {isAddingModalOpen && (
                <CreazioneCliente onClose={() => setIsAddingModalOpen(false)} />
            )}

            {isEditModalOpen && (
                <ModificaCliente
                    cliente={selectedCliente}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
