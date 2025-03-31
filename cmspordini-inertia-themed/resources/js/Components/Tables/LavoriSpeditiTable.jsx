import React, { useMemo } from "react";
import { Content } from "../Content";
import { DataTable } from "./DataTable";
import {
    Allegati,
    mapOrders,
    MedicoAndRagioneSociale,
    TableColumn,
} from "../TableFields";

const LavoriSpeditiTable = ({ lavori, handleFile }) => {
    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
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
                allegatiCell,
                false,
                false
            ),
        ],
        []
    );

    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            <Content.Layout title={"Lavori spediti"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriSpeditiTable;
