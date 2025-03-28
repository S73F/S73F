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
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import { Box, Link, Typography } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";
import { anchorStyle, iconStyle } from "../../styles/styles";
import { Allegati } from "../TableFields";

const LavoriInCorsoTable = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            {
                field: "medicoOrdinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 220,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography component="p" variant="p">
                            {params.row.medicoOrdinante}
                        </Typography>
                        <Typography
                            component={ModalLink}
                            variant="p"
                            href={`/operatore/gestione-clienti/modifica/${params.row.idCliente}`}
                            sx={anchorStyle}
                        >
                            {params.row.ragione_sociale}
                        </Typography>
                    </Box>
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
                field: "Operatore",
                headerName: "Operatore",
                flex: 1,
                minWidth: 110,
                headerClassName: "headerColumn",
            },
            {
                field: "data_inizioLavorazione",
                headerName: "Data inizio lavorazione",
                flex: 1,
                minWidth: 170,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Box display="flex" flexDirection="column" gap={0.5}>
                        <Typography component="p" variant="p">
                            {params.row.data_inizioLavorazione}
                        </Typography>
                        {params.row.note_ulti_mod && (
                            <Box
                                sx={{
                                    color: "#ff0000",
                                }}
                            >
                                <Typography
                                    component="p"
                                    variant="p"
                                    fontWeight={500}
                                >
                                    Ultima modifica:
                                </Typography>
                                <Typography
                                    component="p"
                                    variant="p"
                                    fontWeight={500}
                                >
                                    {params.row.note_ulti_mod}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                ),
            },
            {
                field: "Allegati",
                headerName: "Allegati",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
                sortable: false,
                renderCell: (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"operatore"}
                        handleFile={handleFile}
                    />
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
                            component={ModalLink}
                            href={`/operatore/ordini-clienti/caricamento-lavorazione/${params.row.id}`}
                            title="Modifica lavorazione"
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                        </Link>
                        {params.row.file_fin === 1 && (
                            <Link
                                component="button"
                                title="Spedisci lavorazione"
                                onClick={() => handleIncarico(params.row.id)}
                                sx={iconStyle}
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
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faTrashCan} size="xl" />
                        </Link>
                        <Link
                            component="button"
                            title="Annulla incarico"
                            onClick={() =>
                                handleIncarico(params.row.id, "back")
                            }
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faRotateLeft} size="xl" />
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
                idCliente: lavoro.IDcliente,
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
            <ContentContainer.Layout title={"Lavori in corso"} />
            <DataTable.Table rows={mapLavoriInCorso} columns={columns} />;
        </>
    );
};

export default LavoriInCorsoTable;
