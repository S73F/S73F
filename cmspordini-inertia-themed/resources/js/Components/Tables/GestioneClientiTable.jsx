import React, { useMemo } from "react";
import { Link, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { ModalLink } from "@inertiaui/modal-react";
import { AddBox as AddBoxIcon } from "@mui/icons-material";
import {
    AzioniCliente,
    EmailCliente,
    mapClienti,
    RagioneSociale,
    TableColumn,
} from "../TableFields";
import { creazioneClienteBtn } from "../../styles/appStyles";

export default function GestioneClientiTable({ clienti }) {
    const ragioneSocialeCell = useMemo(
        () => (params) => RagioneSociale(params.row),
        []
    );

    const emailClienteCell = useMemo(
        () => (params) => EmailCliente(params.row),
        []
    );

    const azioniClienteCell = useMemo(
        () => (params) => AzioniCliente(params.row),
        []
    );

    const columns = useMemo(
        () => [
            TableColumn(
                "ragione_sociale",
                "Ragione sociale",
                180,
                "",
                ragioneSocialeCell
            ),
            TableColumn("Nome", "Nome", 100),
            TableColumn("emailcliente", "Email", 250, "", emailClienteCell),
            TableColumn("Username", "Username", 100),
            TableColumn("Azioni", "Azioni", 100, "", azioniClienteCell),
        ],
        []
    );

    const mappedClienti = useMemo(() => mapClienti(clienti), [clienti]);

    return (
        <>
            <Link
                component={ModalLink}
                href={`/operatore/gestione-clienti/creazione`}
                title="Crea cliente"
                sx={creazioneClienteBtn}
            >
                <AddBoxIcon sx={{ width: "40px", height: "40px" }} />
                <Typography
                    component="h3"
                    variant="h3"
                    fontSize={18}
                    fontWeight={500}
                >
                    Crea cliente
                </Typography>
            </Link>
            <DataTable.Table rows={mappedClienti} columns={columns} />
        </>
    );
}
