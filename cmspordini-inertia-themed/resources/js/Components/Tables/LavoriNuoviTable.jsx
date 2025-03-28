import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Link, Typography } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";
import { anchorStyle, iconStyle } from "../../styles/styles";
import { Allegati } from "../TableFields";

const LavoriNuoviTable = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            {
                field: "ragione_sociale",
                headerName: "Ragione sociale",
                flex: 1,
                minWidth: 200,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Typography
                        component={ModalLink}
                        variant="p"
                        href={`/operatore/gestione-clienti/modifica/${params.row.idCliente}`}
                        sx={anchorStyle}
                    >
                        {params.row.ragione_sociale}
                    </Typography>
                ),
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
                minWidth: 100,
                headerClassName: "headerColumn",
                sortable: false,
                renderCell: (params) => (
                    <>
                        <Link
                            component="button"
                            title="Accetta incarico"
                            onClick={() => handleIncarico(params.row.id)}
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                        </Link>
                        <Link
                            component={ModalLink}
                            title="Elimina lavoro"
                            href={`/operatore/lavori/eliminazione/${params.row.id}`}
                            sx={iconStyle}
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
                idCliente: lavoro.IDcliente,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                "Medico ordinante": lavoro.medicoOrdinante,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                "Data ordine": lavoro.data || "-",
                "Data inizio lavorazione": lavoro.data_inizioLavorazione || "-",
            })),
        [lavori]
    );

    return (
        <>
            <ContentContainer.Layout title={"Lavori nuovi"} />
            <DataTable.Table rows={mapLavoriNuovi} columns={columns} />;
        </>
    );
};

export default LavoriNuoviTable;
