import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { anchorStyle, iconStyle } from "../styles/styles";
import { Box, Link, Typography } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";

export const TableColumn = (dbField, headerName, minWidth) => ({
    field: dbField,
    headerName: headerName,
    flex: 1,
    minWidth: minWidth,
    headerClassName: "headerColumn",
});

export const MedicoAndRagione = ({ rowParams }) => {
    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography component="p" variant="p">
                {rowParams.medicoOrdinante}
            </Typography>
            <Typography
                component={ModalLink}
                variant="p"
                href={`/operatore/gestione-clienti/modifica/${rowParams.idCliente}`}
                sx={anchorStyle}
            >
                {rowParams.ragione_sociale}
            </Typography>
        </Box>
    );
};

export const Allegati = ({ rowParams, user, handleFile }) => {
    return (
        <>
            <Link
                component="button"
                title="File sorgente"
                onClick={() => handleFile(user, "sorgente", rowParams.id)}
                sx={iconStyle}
            >
                <FontAwesomeIcon icon={faFileZipper} size="xl" />
            </Link>

            <Link
                component="a"
                title="File PDF"
                href={
                    user === "operatore"
                        ? `/operatore/ordini-clienti/pdf/${rowParams.id}`
                        : `/cliente/ordini/pdf/${rowParams.id}`
                }
                target="_blank"
                sx={iconStyle}
            >
                <FontAwesomeIcon icon={faFilePdf} size="xl" />
            </Link>

            {((user === "operatore" && rowParams.file_fin === 1) ||
                (user === "cliente" &&
                    rowParams.stato === 2 &&
                    rowParams.file_fin === 1)) && (
                <Link
                    component="button"
                    title="File finale"
                    onClick={() => handleFile(user, "finale", rowParams.id)}
                    sx={iconStyle}
                >
                    <FontAwesomeIcon icon={faFileZipperSolid} size="xl" />
                </Link>
            )}
        </>
    );
};
