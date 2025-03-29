import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import {
    Allegati,
    mapOrders,
    MedicoAndRagioneSociale,
    TableColumn,
} from "../TableFields";

const LavoriSpeditiTable = ({ lavori, handleFile }) => {
    const columns = useMemo(
        () => [
            TableColumn(
                "medicoOrdinante",
                "Medico ordinante",
                220,
                "",
                (params) => <MedicoAndRagioneSociale rowParams={params.row} />
            ),
            TableColumn("Paziente", "Paziente", 170, ""),
            TableColumn("data", "Data ordine", 140, 140),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                140,
                140
            ),
            TableColumn("data_spedizione", "Data spedizione", 140, 140),
            TableColumn("Operatore", "Operatore", 110, ""),
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

    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            <ContentContainer.Layout title={"Lavori spediti"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriSpeditiTable;
