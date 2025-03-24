import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Box, Link, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { iconStyle } from "../../styles/styles";

export default function LavoriSpediti({ lavori, handleFile, isWindowed }) {
    const columns = useMemo(
        () => [
            {
                field: "medicoOrdinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 240,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography component="p" variant="p">
                            {params.row.medicoOrdinante}
                        </Typography>
                        <Typography component="p" variant="p">
                            {params.row.ragione_sociale}
                        </Typography>
                    </Box>
                ),
            },
            {
                field: "Paziente",
                headerName: "Paziente",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Data ordine",
                headerName: "Data ordine",
                flex: 1,
                minWidth: isWindowed ? 80 : 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Data inizio lavorazione",
                headerName: "Data inizio lavorazione",
                flex: 1,
                minWidth: isWindowed ? 80 : 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Data spedizione",
                headerName: "Data spedizione",
                flex: 1,
                minWidth: isWindowed ? 80 : 100,
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
                minWidth: 100,
                headerClassName: "headerColumn",
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <>
                        <Link
                            component="button"
                            title="File sorgente"
                            onClick={() =>
                                handleFile("sorgente", params.row.id)
                            }
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faFileZipper} size="xl" />
                        </Link>
                        <Link
                            component="a"
                            title="File PDF"
                            href={`/operatore/ordini-clienti/pdf/${params.row.id}`}
                            target="_blank"
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faFilePdf} size="xl" />
                        </Link>
                        {params.row.file_fin === 1 && (
                            <Link
                                component="button"
                                title="File finale"
                                onClick={() =>
                                    handleFile("finale", params.row.id)
                                }
                                sx={iconStyle}
                            >
                                <FontAwesomeIcon
                                    icon={faFileZipperSolid}
                                    size="xl"
                                />
                            </Link>
                        )}
                    </>
                ),
            },
        ],
        []
    );

    const mapLavori = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                medicoOrdinante: lavoro.medicoOrdinante,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                "Data ordine": lavoro.data || "-",
                "Data inizio lavorazione": lavoro.data_inizioLavorazione || "-",
                "Data spedizione": lavoro.data_spedizione || "-",
                Operatore: lavoro.operatore
                    ? `${lavoro.operatore?.cognome || ""} ${
                          lavoro.operatore?.nome || ""
                      }`
                    : "Nessun operatore",
                file_fin: lavoro.file_fin,
            })),
        [lavori]
    );

    return (
        <>
            <DataTable.Layout title={"Lavori spediti"} />
            <DataTable.Table rows={mapLavori} columns={columns} />;
        </>
    );
}
