import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { iconStyle } from "../styles/styles";
import { Link } from "@mui/material";

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

            {rowParams.file_fin === 1 ? (
                <Link
                    component="button"
                    title="File finale"
                    onClick={() => handleFile(user, "finale", rowParams.id)}
                    sx={iconStyle}
                >
                    <FontAwesomeIcon icon={faFileZipperSolid} size="xl" />
                </Link>
            ) : null}
        </>
    );
};
