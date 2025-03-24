import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@mui/material";
import { DataTable } from "./DataTable";

export default function LavoriSpediti({ lavori, handleFile }) {
    const columns = useMemo(
        () => [
            {
                field: "Medico ordinante",
                headerName: "Medico ordinante",
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
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faFileZipper} size="2xl" />
                        </Link>
                        <Link
                            component="a"
                            title="File PDF"
                            href={`/operatore/ordini-clienti/pdf/${params.row.id}`}
                            target="_blank"
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                        </Link>
                        {params.row.file_fin === 1 && (
                            <Link
                                component="button"
                                title="File finale"
                                onClick={() =>
                                    handleFile("finale", params.row.id)
                                }
                                sx={{
                                    color: "inherit",
                                    "&:hover": { color: "#1976d2 " },
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faFileZipperSolid}
                                    size="2xl"
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
                "Medico ordinante": lavoro.medicoOrdinante,
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
