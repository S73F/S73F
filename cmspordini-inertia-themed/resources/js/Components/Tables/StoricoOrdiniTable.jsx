// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
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
// import {
//     Button,
//     TablePagination,
//     TableSortLabel,
//     TextField,
// } from "@mui/material";

// function Row({ ordine }) {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
//                 <TableCell component="th" scope="row" align="center">
//                     {ordine.data}
//                 </TableCell>
//                 <TableCell align="center">{ordine.medicoOrdinante}</TableCell>
//                 <TableCell align="center">
//                     {ordine.data_inizioLavorazione
//                         ? ordine.data_inizioLavorazione
//                         : "-"}
//                 </TableCell>
//                 <TableCell align="center">
//                     {ordine.stato === 0
//                         ? "Nuovo"
//                         : ordine.stato === 1
//                         ? "In lavorazione"
//                         : "Spedito"}
//                 </TableCell>
//                 <TableCell align="center">
//                     {ordine.data_spedizione ? ordine.data_spedizione : "-"}
//                 </TableCell>
//                 <TableCell align="center">
//                     <Button
//                         component="a"
//                         href={`/cliente/ordini/pdf/${ordine.IDordine}`}
//                         target="_blank"
//                     >
//                         <FontAwesomeIcon icon={faFilePdf} size="2xl" />
//                     </Button>
//                 </TableCell>
//             </TableRow>
//             <TableRow>
//                 <TableCell
//                     style={{ paddingBottom: 0, paddingTop: 0 }}
//                     colSpan={7}
//                 >
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{ margin: 1 }}>
//                             <Typography
//                                 variant="h6"
//                                 gutterBottom
//                                 component="div"
//                             >
//                                 Dettagli ordine
//                             </Typography>
//                             <Table size="small" aria-label="dettagli-ordine">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Nome paziente</TableCell>
//                                         <TableCell>Cognome paziente</TableCell>
//                                         <TableCell>
//                                             Indirizzo di spedizione
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     <TableRow key={ordine.IDordine}>
//                                         <TableCell component="th" scope="row">
//                                             {ordine.PazienteNome}
//                                         </TableCell>
//                                         <TableCell>
//                                             {ordine.PazienteCognome}
//                                         </TableCell>
//                                         <TableCell>
//                                             {ordine.IndirizzoSpedizione}
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

// export default function CollapsibleTable({ ordini }) {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     // Search
//     const [copyList, setCopyList] = useState(ordini);
//     // State per il sorting: campo e direzione
//     const [sortColumn, setSortColumn] = useState(null);
//     const [sortDirection, setSortDirection] = useState("asc");

//     useEffect(() => {
//         setCopyList(ordini);
//     }, [ordini]);

//     console.log(ordini);

//     const requestSearch = (searched) => {
//         const filteredList = ordini.filter(
//             (item) =>
//                 item.medicoOrdinante.toLowerCase().includes(searched) ||
//                 item.data.includes(searched) ||
//                 item.data_inizioLavorazione.includes(searched) ||
//                 item.data_spedizione.includes(searched)
//         );

//         setCopyList(filteredList.length > 0 ? filteredList : null);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Funzione per gestire il sorting
//     const handleSort = (column) => {
//         if (sortColumn === column) {
//             // Inverte la direzione se si clicca la stessa colonna
//             setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//         } else {
//             setSortColumn(column);
//             setSortDirection("asc");
//         }
//     };

//     // Applica il sorting all'array copyList
//     const sortedList = React.useMemo(() => {
//         if (!sortColumn) return copyList;
//         return [...copyList].sort((a, b) => {
//             let aVal = a[sortColumn];
//             let bVal = b[sortColumn];

//             // Se il campo è una data, converti in Date
//             if (
//                 ["data", "data_inizioLavorazione", "data_spedizione"].includes(
//                     sortColumn
//                 )
//             ) {
//                 aVal = aVal ? new Date(aVal) : new Date(0);
//                 bVal = bVal ? new Date(bVal) : new Date(0);
//             } else {
//                 // Per altri campi, converti in stringa
//                 aVal = aVal ? aVal.toString().toLowerCase() : "";
//                 bVal = bVal ? bVal.toString().toLowerCase() : "";
//             }

//             if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
//             if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
//             return 0;
//         });
//     }, [copyList, sortColumn, sortDirection]);

//     // Applica la paginazione al risultato ordinato
//     const displayedList = sortedList.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     return (
//         <Box
//             sx={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//             }}
//         >
//             <TextField
//                 variant="outlined"
//                 placeholder="Cerca"
//                 type="search"
//                 onInput={(e) => requestSearch(e.target.value)}
//                 sx={{ width: "40%", mt: "2rem", mb: "1rem" }}
//             />
//             {copyList === null && (
//                 <Typography variant="h6" align="center">
//                     Nessun risultato trovato
//                 </Typography>
//             )}
//             {copyList !== null && (
//                 <>
//                     <TableContainer component={Paper}>
//                         <Table aria-label="collapsible table">
//                             <TableHead sx={{ bgcolor: "#1976d2" }}>
//                                 <TableRow>
//                                     <TableCell />
//                                     <TableCell align="center">
//                                         <TableSortLabel
//                                             active={sortColumn === "data"}
//                                             direction={
//                                                 sortColumn === "data"
//                                                     ? sortDirection
//                                                     : "asc"
//                                             }
//                                             onClick={() => handleSort("data")}
//                                             sx={{
//                                                 color: "#fff",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             Data Ordine
//                                         </TableSortLabel>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <TableSortLabel
//                                             active={
//                                                 sortColumn === "medicoOrdinante"
//                                             }
//                                             direction={
//                                                 sortColumn === "medicoOrdinante"
//                                                     ? sortDirection
//                                                     : "asc"
//                                             }
//                                             onClick={() =>
//                                                 handleSort("medicoOrdinante")
//                                             }
//                                             sx={{
//                                                 color: "#fff",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             Richiedente
//                                         </TableSortLabel>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <TableSortLabel
//                                             active={
//                                                 sortColumn ===
//                                                 "data_inizioLavorazione"
//                                             }
//                                             direction={
//                                                 sortColumn ===
//                                                 "data_inizioLavorazione"
//                                                     ? sortDirection
//                                                     : "asc"
//                                             }
//                                             onClick={() =>
//                                                 handleSort(
//                                                     "data_inizioLavorazione"
//                                                 )
//                                             }
//                                             sx={{
//                                                 color: "#fff",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             Data inizio lavorazione
//                                         </TableSortLabel>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         {/* Se vuoi abilitare il sorting anche su "stato", puoi fare lo stesso */}
//                                         <TableSortLabel
//                                             active={sortColumn === "stato"}
//                                             direction={
//                                                 sortColumn === "stato"
//                                                     ? sortDirection
//                                                     : "asc"
//                                             }
//                                             onClick={() => handleSort("stato")}
//                                             sx={{
//                                                 color: "#fff",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             Stato lavoro
//                                         </TableSortLabel>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <TableSortLabel
//                                             active={
//                                                 sortColumn === "data_spedizione"
//                                             }
//                                             direction={
//                                                 sortColumn === "data_spedizione"
//                                                     ? sortDirection
//                                                     : "asc"
//                                             }
//                                             onClick={() =>
//                                                 handleSort("data_spedizione")
//                                             }
//                                             sx={{
//                                                 color: "#fff",
//                                                 fontWeight: "bold",
//                                             }}
//                                         >
//                                             Data spedizione
//                                         </TableSortLabel>
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             color: "#fff",
//                                             fontWeight: "bold",
//                                         }}
//                                         align="center"
//                                     >
//                                         PDF
//                                     </TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {displayedList.map((ordine) => (
//                                     <Row
//                                         key={ordine.IDordine}
//                                         ordine={ordine}
//                                     />
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25, 50]}
//                         component="div"
//                         count={sortedList.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </>
//             )}
//         </Box>
//     );
// }

import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Button, Link } from "@mui/material";

const columns = [
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
        field: "Data inizio lavorazione",
        headerName: "Data inizio lavorazione",
        flex: 1,
        minWidth: 100,
        headerClassName: "headerColumn",
    },
    {
        field: "Stato lavoro",
        headerName: "Stato lavoro",
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
        field: "PDF",
        headerName: "PDF",
        flex: 1,
        maxWidth: 80,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Link
                component="a"
                href={`/cliente/ordini/pdf/${params.row.id}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", "&:hover": { color: "#1976d2 " } }}
            >
                <FontAwesomeIcon icon={faFilePdf} size="2xl" />
            </Link>
        ),
        headerClassName: "headerColumn",
    },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ ordini }) {
    const mappedOrdini = useMemo(
        () =>
            ordini.map((ordine) => ({
                id: ordine.IDordine,
                "Data ordine": ordine.data,
                Richiedente: ordine.medicoOrdinante,
                Paziente: ordine.PazienteNome + " " + ordine.PazienteCognome,
                "Data inizio lavorazione": ordine.data_inizioLavorazione,
                "Stato lavoro":
                    ordine.stato === 0
                        ? "Nuovo"
                        : ordine.stato === 1
                        ? "In lavorazione"
                        : "Spedito",
                "Data spedizione": ordine.data_spedizione,
                "Indirizzo spedizione": ordine.IndirizzoSpedizione,
            })),
        [ordini]
    );

    return (
        <Paper sx={{ width: "100%", maxWidth: "100%" }}>
            <DataGrid
                rows={mappedOrdini}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 25, 50]}
                headerHeight={70}
                rowHeight={70}
                sx={{
                    border: 0,
                    "& .headerColumn": { bgcolor: "#1976d2", color: "#fff" },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        whiteSpace: "normal",
                        lineHeight: "1.2",
                    },
                    "& .MuiDataGrid-cell": {
                        whiteSpace: "normal",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            />
        </Paper>
    );
}
