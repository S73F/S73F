import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@mui/material";
import { DataTable } from "./DataTable";
import { iconStyle } from "../../styles/styles";
import { StatusChip } from "../StatusChip";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

export default function StoricoOrdiniTable({ ordini }) {
    const { handleFile } = useLavori();

    const columns = useMemo(
        () => [
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
                field: "Indirizzo spedizione",
                headerName: "Indirizzo spedizione",
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
                                handleFile("cliente", "sorgente", params.row.id)
                            }
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faFileZipper} size="xl" />
                        </Link>
                        <Link
                            component="a"
                            title="File PDF"
                            href={`/cliente/ordini/pdf/${params.row.id}`}
                            target="_blank"
                            sx={iconStyle}
                        >
                            <FontAwesomeIcon icon={faFilePdf} size="xl" />
                        </Link>
                        {params.row.stato === 2 &&
                            params.row.file_fin === 1 && (
                                <Link
                                    component="button"
                                    title="File finale"
                                    onClick={() =>
                                        handleFile(
                                            "cliente",
                                            "finale",
                                            params.row.id
                                        )
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
            // {
            //     field: "PDF",
            //     headerName: "PDF",
            //     flex: 1,
            //     maxWidth: 100,
            //     sortable: false,
            //     filterable: false,
            //     renderCell: (params) => (
            //         <Link
            //             component="a"
            //             href={`/cliente/ordini/pdf/${params.row.id}`}
            //             target="_blank"
            //             rel="noopener noreferrer"
            //             sx={iconStyle}
            //         >
            //             <FontAwesomeIcon icon={faFilePdf} size="xl" />
            //         </Link>
            //     ),
            //     headerClassName: "headerColumn",
            // },
        ],
        []
    );

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
                file_fin: ordine.file_fin,
            })),
        [ordini]
    );

    return <DataTable.Table rows={mapOrders} columns={columns} />;
}
