import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Button } from "@mui/material";

function Row({ ordine }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {ordine.data}
                </TableCell>
                <TableCell align="center">{ordine.medicoOrdinante}</TableCell>
                <TableCell align="center">
                    {ordine.data_inizioLavorazione}
                </TableCell>
                <TableCell align="center">
                    {ordine.stato === 0
                        ? "Nuovo"
                        : ordine.stato === 1
                        ? "In lavorazione"
                        : "Spedito"}
                </TableCell>
                <TableCell align="center">{ordine.data_spedizione}</TableCell>
                <TableCell align="center">
                    <Button
                        component="a"
                        href={`/cliente/ordini/pdf/${ordine.IDordine}`}
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Dettagli ordine
                            </Typography>
                            <Table size="small" aria-label="dettagli-ordine">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome paziente</TableCell>
                                        <TableCell>Cognome paziente</TableCell>
                                        <TableCell align="center">
                                            Indirizzo di spedizione
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={ordine.IDordine}>
                                        <TableCell component="th" scope="row">
                                            {ordine.PazienteNome}
                                        </TableCell>
                                        <TableCell>
                                            {ordine.PazienteCognome}
                                        </TableCell>
                                        <TableCell align="center">
                                            {ordine.IndirizzoSpedizione}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function CollapsibleTable({ ordini }) {
    console.log(ordini);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ bgcolor: "#1976d2" }}>
                    <TableRow>
                        <TableCell />
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            Data Ordine
                        </TableCell>
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            Richiedente
                        </TableCell>
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            Inizio lavoro
                        </TableCell>
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            Stato lavoro
                        </TableCell>
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            Spedizione
                        </TableCell>
                        <TableCell
                            sx={{ color: "#fff", fontWeight: "bold" }}
                            align="center"
                        >
                            PDF
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ordini.map((ordine) => (
                        <Row key={ordine.IDordine} ordine={ordine} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
