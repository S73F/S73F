import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { StatusChip } from "../StatusChip";
import {
    Allegati,
    mapOrders,
    MedicoAndRagioneSociale,
    StatoLavoro,
    TableColumn,
} from "../TableFields";

export default function OrdiniClienteTable({ ordini }) {
    const { handleFile } = useLavori();

    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
        []
    );

    const statoLavoroCell = useMemo(
        () => (params) => StatoLavoro(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
    );

    const columns = useMemo(
        () => [
            TableColumn(
                "medicoOrdinante",
                "Medico ordinante",
                220,
                "",
                medicoAndRagioneSocialeCell
            ),
            TableColumn("Paziente", "Paziente", 170),
            TableColumn("stato", "Stato lavoro", 130, "", statoLavoroCell),
            TableColumn("data", "Data ordine", 100),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                100
            ),
            TableColumn("data_spedizione", "Data spedizione", 100),
            TableColumn("Operatore", "Operatore", 100),
            TableColumn(
                "Allegati",
                "Allegati",
                90,
                "",
                allegatiCell,
                false,
                false
            ),
        ],
        []
    );

    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
