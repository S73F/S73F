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

    const columns = useMemo(
        () => [
            TableColumn(
                "medicoOrdinante",
                "Medico ordinante",
                220,
                "",
                (params) => <MedicoAndRagioneSociale rowParams={params.row} />
            ),
            TableColumn("Paziente", "Paziente", 170),
            TableColumn("stato", "Stato lavoro", 130, "", (params) => (
                <StatoLavoro rowParams={params.row} />
            )),
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
                (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"operatore"}
                        handleFile={handleFile}
                    />
                ),
                false,
                false
            ),
        ],
        []
    );

    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
