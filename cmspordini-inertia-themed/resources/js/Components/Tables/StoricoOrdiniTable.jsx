// import React from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

// // Componente per ogni riga della tabella
// function OrderRow({ order }) {
//     const [open, setOpen] = React.useState(false);

//     // Funzione di utilità per tradurre lo stato numerico in testo
//     const getStatusText = (status) => {
//         if (status === 0) return "Nuovo";
//         if (status === 1) return "In lavorazione";
//         return "Spedito";
//     };

//     return (
//         <>
//             <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
//                 {/* Bottone per espandere/collassare */}
//                 <TableCell>
//                     <IconButton
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? (
//                             <KeyboardArrowUpIcon />
//                         ) : (
//                             <KeyboardArrowDownIcon />
//                         )}
//                     </IconButton>
//                 </TableCell>

//                 {/* Colonne principali */}
//                 <TableCell>{order.data}</TableCell>
//                 <TableCell>{order.medicoOrdinante}</TableCell>
//                 <TableCell>
//                     {order.data_inizioLavorazione
//                         ? order.data_inizioLavorazione
//                         : "-"}
//                 </TableCell>
//                 <TableCell>{getStatusText(order.stato)}</TableCell>
//                 <TableCell>
//                     {order.data_spedizione ? order.data_spedizione : "-"}
//                 </TableCell>
//                 <TableCell>
//                     <a
//                         href={`/cliente/ordini/pdf/${order.IDordine}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                     >
//                         <FontAwesomeIcon icon={faFilePdf} size="lg" />
//                     </a>
//                 </TableCell>
//             </TableRow>

//             {/* Riga espandibile */}
//             <TableRow>
//                 <TableCell
//                     style={{ paddingBottom: 0, paddingTop: 0 }}
//                     colSpan={7}
//                 >
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography
//                                 variant="subtitle1"
//                                 gutterBottom
//                                 component="div"
//                             >
//                                 Dettagli ordine
//                             </Typography>
//                             <Table size="small" aria-label="dettagli ordine">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Nome paziente</TableCell>
//                                         <TableCell>Cognome paziente</TableCell>
//                                         <TableCell>Indirizzo</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     <TableRow>
//                                         <TableCell>
//                                             {order.PazienteNome}
//                                         </TableCell>
//                                         <TableCell>
//                                             {order.PazienteCognome}
//                                         </TableCell>
//                                         <TableCell>
//                                             {order.IndirizzoSpedizione}
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </>
//     );
// }

// // Componente principale della tabella collapsible
// export default function CollapsibleStoricoOrdiniTable({ ordini }) {
//     return (
//         <TableContainer component={Paper}>
//             <Table aria-label="collapsible table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell />
//                         <TableCell>Data Ordine</TableCell>
//                         <TableCell>Richiedente</TableCell>
//                         <TableCell>Inizio lavoro</TableCell>
//                         <TableCell>Stato lavoro</TableCell>
//                         <TableCell>Spedizione</TableCell>
//                         <TableCell>PDF</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {ordini.map((order) => (
//                         <OrderRow key={order.IDordine} order={order} />
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

import React, { useState } from "react";
import "../../../css/table.css";
import DataTable from "react-data-table-component";
import useStoricoOrdiniTable from "../../Hooks/Components/Tables/useStoricoOrdiniTable";
import StoricoOrdiniTableExpanded from "./StoricoOrdiniTableExpanded";
import { SearchBox } from "./SearchBox";

export default function StoricoOrdiniTable({ ordini }) {
    const { records, columns, handleFilter } = useStoricoOrdiniTable({
        ordini,
    });

    return (
        <>
            <SearchBox handleFilter={handleFilter} />
            <DataTable
                className="custom-table"
                columns={columns}
                data={records}
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={StoricoOrdiniTableExpanded}
                pagination
                paginationComponentOptions={{
                    rowsPerPageText: "Righe per pagina",
                    rangeSeparatorText: "di",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Tutte",
                }}
                fixedHeader
            ></DataTable>
        </>
    );
}
