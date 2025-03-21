import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@mui/material";
import { DataTable } from "./DataTable";
import { ModalLink } from "@inertiaui/modal-react";

export default function GestioneClientiTable({ clienti }) {
    const columns = useMemo(
        () => [
            {
                field: "ragione_sociale",
                headerName: "Ragione sociale",
                flex: 1,
                minWidth: 150,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Link
                        component={ModalLink}
                        href={`/operatore/gestione-clienti/modifica/${params.row.id}`}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                            "&:hover": { color: "#1976d2 " },
                        }}
                    >
                        {params.row.ragione_sociale}
                    </Link>
                ),
            },
            {
                field: "Nome",
                headerName: "Nome",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "emailcliente",
                headerName: "Email",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <Link
                        component="a"
                        href={`mailto:${params.row.emailcliente}`}
                        sx={{
                            color: "inherit",
                            textDecoration: "none",
                            "&:hover": { color: "#1976d2 " },
                        }}
                    >
                        {params.row.emailcliente}
                    </Link>
                ),
            },
            {
                field: "Username",
                headerName: "Username",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
            },
            {
                field: "Azioni",
                headerName: "Azioni",
                flex: 1,
                minWidth: 100,
                headerClassName: "headerColumn",
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <>
                        <Link
                            component={ModalLink}
                            href={`/operatore/gestione-clienti/modifica/${params.row.id}`}
                            title="Modifica cliente"
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                        </Link>
                        <Link
                            component={ModalLink}
                            href={`/operatore/gestione-clienti/eliminazione/${params.row.id}`}
                            title="Elimina cliente"
                            sx={{
                                color: "inherit",
                                "&:hover": { color: "#1976d2 " },
                                mr: 0.5,
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan} size="2xl" />
                        </Link>
                    </>
                ),
            },
        ],
        []
    );

    const mapOrders = useMemo(
        () =>
            clienti.map((cliente) => ({
                id: cliente.IDcliente,
                ragione_sociale: cliente.ragione_sociale,
                Nome: cliente.cognome + " " + cliente.nome,
                emailcliente: cliente.emailcliente,
                Username: cliente.username,
            })),
        [clienti]
    );

    return <DataTable.Table rows={mapOrders} columns={columns} />;
}

// import React from "react";
// import { useGestioneClientiTable } from "../../Hooks/Components/Tables/useGestioneClientiTable";
// import { SearchBox } from "./SearchBox";
// import DataTable from "react-data-table-component";
// import { ModalLink } from "@inertiaui/modal-react";
// import "../../../css/table.css";

// export default function GestioneClientiTable({ clienti }) {
//     const { records, columns, handleFilter } = useGestioneClientiTable({
//         clienti,
//     });

//     return (
//         <>
//             <div id="gestione-clienti-interactions">
//                 <SearchBox handleFilter={handleFilter} />
//                 <ModalLink
//                     id="add-cliente"
//                     href={"/operatore/gestione-clienti/creazione"}
//                     title="Aggiungi cliente"
//                 >
//                     +
//                 </ModalLink>
//             </div>
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
