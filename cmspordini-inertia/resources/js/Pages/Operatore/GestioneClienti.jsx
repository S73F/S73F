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

            <GestioneClientiTable
                clienti={clienti}
                handleDelete={handleDelete}
            />
        </div>
    );
}

GestioneClienti.layout = (page) => <Layout>{page}</Layout>;
