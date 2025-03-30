import React, { useMemo } from "react";
import { DataTable } from "./DataTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Allegati, mapOrders, StatoLavoro, TableColumn } from "../TableFields";

export default function StoricoOrdiniTable({ ordini }) {
    const { handleFile } = useLavori();

    const columns = useMemo(
        () => [
            TableColumn("data", "Data ordine", 100),
            TableColumn("medicoOrdinante", "Richiedente", 100),
            TableColumn("Paziente", "Paziente", 100),
            TableColumn("stato", "Stato lavoro", 130, "", (params) => (
                <StatoLavoro rowParams={params.row} />
            )),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                100
            ),
            TableColumn("data_spedizione", "Data spedizione", 100),
            TableColumn("IndirizzoSpedizione", "Indirizzo spedizione", 100),
            TableColumn(
                "Allegati",
                "Allegati",
                100,
                "",
                (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"cliente"}
                        handleFile={handleFile}
                    />
                ),
                false
            ),
        ],
        []
    );

    const mappedOrders = useMemo(() => mapOrders(ordini), [ordini]);

    return <DataTable.Table rows={mappedOrders} columns={columns} />;
}
