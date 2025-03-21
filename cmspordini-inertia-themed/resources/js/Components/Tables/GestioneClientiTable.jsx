import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { Container, Link, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { ModalLink } from "@inertiaui/modal-react";
import { AddBox as AddBoxIcon } from "@mui/icons-material";

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
                minWidth: 250,
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

    return (
        <>
            <Link
                component={ModalLink}
                href={`/operatore/gestione-clienti/creazione`}
                title="Crea cliente"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100px",
                    height: "60px",
                    mt: -2,
                    mb: 5,
                    textDecoration: "none",
                    "&:hover": {
                        opacity: "0.8",
                    },
                }}
            >
                <AddBoxIcon sx={{ width: "60px", height: "60px" }} />
                <Typography
                    component="h3"
                    variant="h3"
                    fontSize={18}
                    fontWeight={500}
                >
                    Crea cliente
                </Typography>
            </Link>
            <DataTable.Table rows={mapOrders} columns={columns} />
        </>
    );
}
