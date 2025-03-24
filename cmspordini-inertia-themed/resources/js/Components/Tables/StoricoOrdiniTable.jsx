import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Chip, Link } from "@mui/material";
import { DataTable } from "./DataTable";
import { chipStyle, circleStyles, iconStyle } from "../../styles/styles";
import { Circle } from "@mui/icons-material";

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
        field: "stato",
        headerName: "Stato lavoro",
        flex: 1,
        minWidth: 130,
        headerClassName: "headerColumn",
        renderCell: (params) => (
            <>
                {params.row.stato === 0 && (
                    <Chip
                        label="Nuovo"
                        icon={<Circle sx={circleStyles.nuovo} />}
                        sx={{
                            ...chipStyle,
                            backgroundColor: "#ffe6e6", // ad esempio per "Nuovo"
                        }}
                    />
                )}
                {params.row.stato === 1 && (
                    <Chip
                        label="In corso"
                        icon={<Circle sx={circleStyles.inCorso} />}
                        sx={{
                            ...chipStyle,
                            backgroundColor: "#ffedb5", // ad esempio per "In corso"
                        }}
                    />
                )}
                {params.row.stato === 2 && (
                    <Chip
                        label="Spedito"
                        icon={<Circle sx={circleStyles.spedito} />}
                        sx={{
                            ...chipStyle,
                            backgroundColor: "#b5ffb5", // ad esempio per "Spedito"
                        }}
                    />
                )}
            </>
        ),
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
                sx={iconStyle}
            >
                <FontAwesomeIcon icon={faFilePdf} size="xl" />
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
                "Data inizio lavorazione": ordine.data_inizioLavorazione || "-",
                stato: ordine.stato,
                "Data spedizione": ordine.data_spedizione || "-",
                "Indirizzo spedizione": ordine.IndirizzoSpedizione,
            })),
        [ordini]
    );

    return <DataTable.Table rows={mapOrders} columns={columns} />;
}
