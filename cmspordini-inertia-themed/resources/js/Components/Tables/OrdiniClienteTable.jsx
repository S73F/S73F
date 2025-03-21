// import React from "react";
// import "../../../css/table.css";
// import DataTable from "react-data-table-component";
// import { useOrdiniClientiTable } from "../../Hooks/Components/Tables/useOrdiniClienteTable";
// import { SearchBox } from "./SearchBox";

// export default function OrdiniClienteTable({ ordini }) {
//     const { records, columns, handleFilter } = useOrdiniClientiTable({
//         ordini,
//     });

//     return (
//         <>
//             <SearchBox handleFilter={handleFilter} />
//             <DataTable
//                 className="custom-table"
//                 columns={columns}
//                 data={records}
//                 pagination
//                 paginationComponentOptions={{
//                     rowsPerPageText: "Righe per pagina",
//                     rangeSeparatorText: "di",
//                     selectAllRowsItem: true,
//                     selectAllRowsItemText: "Tutte",
//                 }}
//             />
//         </>
//     );
// }

import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@mui/material";
import { DataTable } from "./DataTable";
import { useOrdiniClientiTable } from "../../Hooks/Components/Tables/useOrdiniClienteTable";

export default function StoricoOrdiniTable({ ordini }) {
    const { handleFile, handleFileFinale } = useOrdiniClientiTable({ ordini });

    const columns = [
        {
            field: "Dottore",
            headerName: "Dottore",
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
                        onClick={() => handleFile(params.row.id)}
                        sx={{
                            color: "inherit",
                            "&:hover": { color: "#1976d2 " },
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
                        }}
                    >
                        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                    </Link>
                    {params.row.file_fin === 1 && (
                        <Link
                            component="button"
                            title="File finale"
                            onClick={() => handleFileFinale(params.row.id)}
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
    ];

    const mapOrders = useMemo(
        () =>
            ordini.map((ordine) => ({
                id: ordine.IDordine,
                "Data ordine": ordine.data,
                Dottore: ordine.medicoOrdinante,
                Paziente: ordine.PazienteCognome + " " + ordine.PazienteNome,
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
