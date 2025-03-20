import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Link } from "@mui/material";
import DataTable from "./DataTable";

const columns = [
    {
        field: "Data ordine",
        headerName: "Data ordine",
        flex: 1,
        minWidth: 100,
        headerClassName: "headerColumn",
    },
    {
        field: "Richiedente",
        headerName: "Richiedente",
        flex: 1,
        minWidth: 100,
        headerClassName: "headerColumn",
    },
    {
        field: "Paziente",
        headerName: "Paziente",
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
        field: "Stato lavoro",
        headerName: "Stato lavoro",
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
        field: "Indirizzo spedizione",
        headerName: "Indirizzo spedizione",
        flex: 1,
        minWidth: 100,
        headerClassName: "headerColumn",
    },
    {
        field: "PDF",
        headerName: "PDF",
        flex: 1,
        maxWidth: 80,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Link
                component="a"
                href={`/cliente/ordini/pdf/${params.row.id}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", "&:hover": { color: "#1976d2 " } }}
            >
                <FontAwesomeIcon icon={faFilePdf} size="2xl" />
            </Link>
        ),
        headerClassName: "headerColumn",
    },
];

export default function StoricoOrdiniTable({ ordini }) {
    const mapOrders = useMemo(
        () =>
            ordini.map((ordine) => ({
                id: ordine.IDordine,
                "Data ordine": ordine.data,
                Richiedente: ordine.medicoOrdinante,
                Paziente: ordine.PazienteNome + " " + ordine.PazienteCognome,
                "Data inizio lavorazione": ordine.data_inizioLavorazione,
                "Stato lavoro":
                    ordine.stato === 0
                        ? "Nuovo"
                        : ordine.stato === 1
                        ? "In lavorazione"
                        : "Spedito",
                "Data spedizione": ordine.data_spedizione,
                "Indirizzo spedizione": ordine.IndirizzoSpedizione,
            })),
        [ordini]
    );

    return <DataTable rows={mapOrders} columns={columns} />;
}
