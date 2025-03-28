import React, { useMemo } from "react";
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
import { StatusChip } from "./StatusChip";

export const TableColumn = (
    dbField,
    headerName,
    minWidth,
    maxWidth,
    renderCell,
    sortable = true,
    filterable = true
) => ({
    ...(dbField && { field: dbField }),
    headerName: headerName,
    flex: 1,
    minWidth: minWidth,
    ...(maxWidth && { maxWidth }),
    sortable: sortable,
    filterable: filterable,
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

export const StatoLavoro = ({ rowParams }) => {
    return (
        <>
            {rowParams.stato === 0 && <StatusChip.Nuovo />}
            {rowParams.stato === 1 && <StatusChip.InCorso />}
            {rowParams.stato === 2 && <StatusChip.Spedito />}
        </>
    );
};

export const DataInizioLavorazione = ({ rowParams }) => {
    return (
        <Box display="flex" flexDirection="column" gap={0.5}>
            <Typography component="p" variant="p">
                {rowParams.data_inizioLavorazione}
            </Typography>
            {rowParams.note_ulti_mod && (
                <Box
                    sx={{
                        color: "#ff0000",
                    }}
                >
                    <Typography component="p" variant="p" fontWeight={500}>
                        Ultima modifica:
                    </Typography>
                    <Typography component="p" variant="p" fontWeight={500}>
                        {rowParams.note_ulti_mod}
                    </Typography>
                </Box>
            )}
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
                    btnTitle={"Elimina ordine"}
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

export const mapOrders = (ordini) =>
    ordini.map((ordine) => ({
        id: ordine.IDordine,
        ...(ordine.IDcliente && { idCliente: ordine.IDcliente }),
        ...(ordine.cliente?.ragione_sociale && {
            ragione_sociale: ordine.cliente.ragione_sociale,
        }),
        ...(ordine.medicoOrdinante && {
            medicoOrdinante: ordine.medicoOrdinante,
        }),
        ...(ordine.PazienteCognome &&
            ordine.PazienteNome && {
                Paziente: ordine.PazienteCognome + " " + ordine.PazienteNome,
            }),
        ...(ordine.IndirizzoSpedizione && {
            IndirizzoSpedizione: ordine.IndirizzoSpedizione,
        }),
        ...(ordine.operatore && {
            Operatore:
                (ordine.operatore?.nome || "") +
                " " +
                (ordine.operatore?.cognome || ""),
        }),
        ...(ordine.data && {
            data: ordine.data || "-",
        }),
        ...(ordine.data_inizioLavorazione && {
            data_inizioLavorazione: ordine.data_inizioLavorazione || "-",
        }),
        ...(ordine.data_spedizione && {
            data_spedizione: ordine.data_spedizione || "-",
        }),
        ...(ordine.file_fin !== undefined && { file_fin: ordine.file_fin }),
        ...(ordine.note_ulti_mod && { note_ulti_mod: ordine.note_ulti_mod }),
    }));
