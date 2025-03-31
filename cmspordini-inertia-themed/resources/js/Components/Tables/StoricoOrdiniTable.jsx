import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Allegati, mapOrders, StatoLavoro, TableColumn } from "../TableFields";

export default function StoricoOrdiniTable({ ordini }) {
    const { handleFile } = useLavori();

    const statoLavoroCell = useMemo(
        () => (params) => StatoLavoro(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "cliente", handleFile),
        [handleFile]
    );

    const columns = useMemo(
        () => [
            TableColumn("data", "Data ordine", 100),
            TableColumn("medicoOrdinante", "Richiedente", 100),
            TableColumn("Paziente", "Paziente", 100),
            TableColumn("stato", "Stato lavoro", 130, "", statoLavoroCell),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                100
            ),
            TableColumn("data_spedizione", "Data spedizione", 100),
            TableColumn("IndirizzoSpedizione", "Indirizzo spedizione", 100),
            TableColumn("Allegati", "Allegati", 100, "", allegatiCell, false),
        ],
        []
    );

    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
