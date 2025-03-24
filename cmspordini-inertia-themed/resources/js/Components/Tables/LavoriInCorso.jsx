import React, { useMemo } from "react";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import {
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faShareFromSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "./DataTable";
import { Link } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";

const LavoriInCorso = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            {
                field: "medicoOrdinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 200,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <div>
                        {params.row.medicoOrdinante}
                        <br />
                        {params.row.ragione_sociale}
                    </div>
                ),
            },
            {
                field: "Paziente",
                headerName: "Paziente",
                flex: 1,
                minWidth: 150,
                headerClassName: "headerColumn",
            },
            {
                field: "Operatore",
                headerName: "Operatore",
                flex: 1,
                minWidth: 130,
                headerClassName: "headerColumn",
            },
            {
                field: "data_inizioLavorazione",
                headerName: "Data inizio lavorazione",
                flex: 1,
                minWidth: 170,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <div>
                        {params.row.data_inizioLavorazione}
                        {params.row.note_ulti_mod && (
                            <div id="last-modified">
                                {`Ultima modifica:`}
                                <br />
                                {params.row.note_ulti_mod}
                            </div>
                        )}
                    </div>
                ),
            },
            {
                field: "Allegati",
                headerName: "Allegati",
                flex: 1,
                minWidth: 120,
                headerClassName: "headerColumn",
                sortable: false,
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
                            <FontAwesomeIcon icon={faFileZipper} size="xl" />
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
                            <FontAwesomeIcon icon={faFilePdf} size="xl" />
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
                                    size="xl"
                                />
                            </Link>
                        )}
                    </>
                ),
            },
            {
                field: "Azioni",
                headerName: "Azioni",
                flex: 1,
                minWidth: 120,
                headerClassName: "headerColumn",
                sortable: false,
                renderCell: (params) => (
                    <>
                        <Link
                            component="button"
                            title="Annulla incarico"
                            onClick={() =>
                                handleIncarico(params.row.id, "back")
                            }
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faRotateLeft} size="xl" />
                        </Link>
                        <Link
                            component={ModalLink}
                            href={`/operatore/ordini-clienti/caricamento-lavorazione/${params.row.id}`}
                            title="Modifica lavorazione"
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                        </Link>
                        {params.row.file_fin === 1 && (
                            <Link
                                component="button"
                                title="Spedisci lavorazione"
                                onClick={() => handleIncarico(params.row.id)}
                                sx={{
                                    color: "inherit",
                                    "&:hover": { color: "#1976d2 " },
                                    mr: 0.5,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faShareFromSquare}
                                    size="xl"
                                />
                            </Link>
                        )}
                        <Link
                            component={ModalLink}
                            title="Elimina lavoro"
                            href={`/operatore/lavori/eliminazione/${params.row.id}`}
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} size="xl" />
                        </Link>
                    </>
                ),
            },
        ],
        []
    );

    const mapLavoriInCorso = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                medicoOrdinante: lavoro.medicoOrdinante,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                Operatore:
                    (lavoro.operatore?.nome || "") +
                    " " +
                    (lavoro.operatore?.cognome || ""),
                data_inizioLavorazione: lavoro.data_inizioLavorazione || "-",
                file_fin: lavoro.file_fin,
                note_ulti_mod: lavoro.note_ulti_mod,
            })),
        [lavori]
    );

    return (
        <>
            <DataTable.Layout title={"Lavori in corso"} />
            <DataTable.Table rows={mapLavoriInCorso} columns={columns} />;
        </>
    );
};

export default LavoriInCorso;
