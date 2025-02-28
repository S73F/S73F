import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import CreazioneCliente from "../../Components/Modals/CreazioneCliente";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import ModificaCliente from "../../Components/Modals/ModificaCliente";
import { useGestioneClienti } from "../../Hooks/Operatore/useGestioneClienti";
import { useModal } from "../../Hooks/Components/Modals/useModal";

export default function GestioneClienti({ clienti }) {
    const { modal, openModal, closeModal } = useModal();
    const { handleDelete } = useGestioneClienti();
    // const { modal, openModal, closeModal, handleDelete } = useGestioneClienti();

    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>

            <button
                id="add-cliente-btn"
                onClick={() => openModal("creazione")}
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
                openModal={openModal}
                handleDelete={handleDelete}
            />

            {modal.type === "creazione" && (
                <CreazioneCliente onClose={() => closeModal()} />
            )}

            {modal.type === "modifica" && (
                <ModificaCliente
                    cliente={modal.param}
                    onClose={() => closeModal()}
                />
            )}
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
