import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faFileZipper,
    faSquareCheck,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";

const LavoriNuovi = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            {
                field: "Ragione sociale",
                headerName: "Ragione sociale",
                flex: 1,
                minWidth: 200,
                headerClassName: "headerColumn",
            },
            {
                field: "Medico ordinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 200,
                headerClassName: "headerColumn",
            },
            {
                field: "Paziente",
                headerName: "Paziente",
                flex: 1,
                minWidth: 200,
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
                field: "Allegati",
                headerName: "Allegati",
                flex: 1,
                minWidth: 100,
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
                    </>
                ),
            },
            {
                field: "Azioni",
                headerName: "Azioni",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
                sortable: false,
                renderCell: (params) => (
                    <>
                        <Link
                            component="button"
                            title="Accetta incarico"
                            onClick={() => handleIncarico(params.row.id)}
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faSquareCheck} size="xl" />
                        </Link>
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

    const mapLavoriNuovi = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                "Ragione sociale": lavoro.cliente.ragione_sociale,
                "Medico ordinante": lavoro.medicoOrdinante,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                "Data ordine": lavoro.data || "-",
                "Data inizio lavorazione": lavoro.data_inizioLavorazione || "-",
            })),
        [lavori]
    );

    return (
        <>
            <DataTable.Layout title={"Lavori nuovi"} />
            <DataTable.Table rows={mapLavoriNuovi} columns={columns} />;
        </>
    );
};

export default LavoriNuovi;
