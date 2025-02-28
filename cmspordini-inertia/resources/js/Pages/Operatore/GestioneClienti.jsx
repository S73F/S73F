import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/gestioneClienti.css";
import CreazioneCliente from "../../Components/Modals/CreazioneCliente";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import ModificaCliente from "../../Components/Modals/ModificaCliente";
import { useGestioneClienti } from "../../Hooks/Operatore/useGestioneClienti";
import { ModalLink } from "@inertiaui/modal-react";

export default function GestioneClienti({ clienti }) {
    const { handleDelete } = useGestioneClienti();

    return (
        <div id="gestione-clienti-container">
            <h1 id="gestione-clienti-title">Gestione Clienti</h1>

            <ModalLink href={"/operatore/gestione-clienti/creazione"}>
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
            </ModalLink>

            <GestioneClientiTable
                clienti={clienti}
                handleDelete={handleDelete}
            />
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
