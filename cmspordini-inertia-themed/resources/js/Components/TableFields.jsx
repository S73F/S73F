import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faShareFromSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
    faFileZipper as faFileZipperSolid,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { anchorStyle, iconStyle } from "../styles/styles";
import { Box, Link, Typography } from "@mui/material";
import { ModalLink } from "@inertiaui/modal-react";

export const TableColumn = (
    dbField,
    headerName,
    minWidth,
    renderCell,
    sortable = true
) => ({
    field: dbField,
    headerName: headerName,
    flex: 1,
    minWidth: minWidth,
    sortable: sortable,
    headerClassName: "headerColumn",
    ...(renderCell && { renderCell }),
});

export const TableModalText = ({ href, children }) => {
    return (
        <Typography
            component={ModalLink}
            variant="p"
            href={href}
            sx={anchorStyle}
        >
            {children}
        </Typography>
    );
};

export const TableFieldButton = ({
    btnType,
    btnTitle,
    icon,
    onClick,
    href,
    target = "_blank",
}) => {
    return (
        <Link
            component={btnType}
            title={btnTitle}
            {...(btnType === "button" && { onClick })}
            {...((btnType === "a" || btnType === ModalLink) && {
                href,
                target,
            })}
            sx={iconStyle}
        >
            <FontAwesomeIcon icon={icon} size="xl" />
        </Link>
    );
};

export const RagioneSociale = ({ rowParams }) => {
    return (
        <TableModalText
            href={`/operatore/gestione-clienti/modifica/${rowParams.idCliente}`}
        >
            {rowParams.ragione_sociale}
        </TableModalText>
    );
};

export const MedicoAndRagioneSociale = ({ rowParams }) => {
    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography component="p" variant="p">
                {rowParams.medicoOrdinante}
            </Typography>
            <TableModalText
                href={`/operatore/gestione-clienti/modifica/${rowParams.idCliente}`}
            >
                {rowParams.ragione_sociale}
            </TableModalText>
        </Box>
    );
};

export const Allegati = ({ rowParams, user, handleFile }) => {
    return (
        <>
            <TableFieldButton
                btnType={"button"}
                btnTitle={"File sorgente"}
                onClick={() => handleFile(user, "sorgente", rowParams.id)}
                icon={faFileZipper}
            />
            <TableFieldButton
                btnType={"a"}
                btnTitle={"File PDF"}
                href={
                    user === "operatore"
                        ? `/operatore/ordini-clienti/pdf/${rowParams.id}`
                        : `/cliente/ordini/pdf/${rowParams.id}`
                }
                icon={faFilePdf}
            />

            {((user === "operatore" && rowParams.file_fin === 1) ||
                (user === "cliente" &&
                    rowParams.stato === 2 &&
                    rowParams.file_fin === 1)) && (
                <TableFieldButton
                    btnType={"button"}
                    btnTitle={"File finale"}
                    onClick={() => handleFile(user, "finale", rowParams.id)}
                    icon={faFileZipperSolid}
                />
            )}
        </>
    );
};

export const Azioni = ({ rowParams, tipoLavori, handleIncarico }) => {
    if (tipoLavori === "nuovi") {
        return (
            <>
                <TableFieldButton
                    btnType={"button"}
                    btnTitle={"Accetta incarico"}
                    onClick={() => handleIncarico(rowParams.id)}
                    icon={faCircleCheck}
                />
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Elimina lavoro"}
                    href={`/operatore/lavori/eliminazione/${rowParams.id}`}
                    icon={faTrashCan}
                />
            </>
        );
    } else if (tipoLavori === "inCorso") {
        return (
            <>
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Modifica lavorazione"}
                    href={`/operatore/ordini-clienti/caricamento-lavorazione/${rowParams.id}`}
                    icon={faPenToSquare}
                />
                {rowParams.file_fin === 1 && (
                    <TableFieldButton
                        btnType={"button"}
                        btnTitle={"Spedisci lavorazione"}
                        onClick={() => handleIncarico(rowParams.id)}
                        icon={faShareFromSquare}
                    />
                )}
                <TableFieldButton
                    btnType={ModalLink}
                    btnTitle={"Elimina ordine"}
                    href={`/operatore/lavori/eliminazione/${rowParams.id}`}
                    icon={faTrashCan}
                />
                <TableFieldButton
                    btnType={"button"}
                    btnTitle={"Annulla incarico"}
                    onClick={() => handleIncarico(rowParams.id, "back")}
                    icon={faRotateLeft}
                />
            </>
        );
    }
};
