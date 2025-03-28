import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { anchorStyle } from "../../styles/styles";
import { ModalLink } from "@inertiaui/modal-react";
import { StatusChip } from "../StatusChip";
import { Allegati, MedicoAndRagione } from "../TableFields";

export default function OrdiniClienteTable({ ordini }) {
    const { handleFile } = useLavori();

    const columns = useMemo(
        () => [
            {
                field: "medicoOrdinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 220,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <MedicoAndRagione rowParams={params.row} />
                ),
            },
            {
                field: "Paziente",
                headerName: "Paziente",
                flex: 1,
                minWidth: 170,
                headerClassName: "headerColumn",
            },
            {
                field: "stato",
                headerName: "Stato lavoro",
                flex: 1,
                minWidth: 130,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <>
                        {params.row.stato === 0 && <StatusChip.Nuovo />}
                        {params.row.stato === 1 && <StatusChip.InCorso />}
                        {params.row.stato === 2 && <StatusChip.Spedito />}
                    </>
                ),
            },
            {
                field: "Data ordine",
                headerName: "Data ordine",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Data inizio lavorazione",
                headerName: "Data inizio lavorazione",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Data spedizione",
                headerName: "Data spedizione",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Operatore",
                headerName: "Operatore",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Allegati",
                headerName: "Allegati",
                flex: 1,
                minWidth: 90,
                headerClassName: "headerColumn",
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"operatore"}
                        handleFile={handleFile}
                    />
                ),
            },
        ],
        []
    );

    const mapOrders = useMemo(
        () =>
            ordini.map((ordine) => ({
                id: ordine.IDordine,
                idCliente: ordine.IDcliente,
                medicoOrdinante: ordine.medicoOrdinante,
                ragione_sociale: ordine.cliente?.ragione_sociale,
                Paziente: ordine.PazienteCognome + " " + ordine.PazienteNome,
                stato: ordine.stato,
                "Data ordine": ordine.data || "-",
                "Data inizio lavorazione": ordine.data_inizioLavorazione || "-",
                "Data spedizione": ordine.data_spedizione || "-",
                Operatore: ordine.operatore
                    ? `${ordine.operatore?.cognome || ""} ${
                          ordine.operatore?.nome || ""
                      }`
                    : "Nessun operatore",
                file_fin: ordine.file_fin,
            })),
        [ordini]
    );

    return <DataTable.Table rows={mapOrders} columns={columns} />;
}
