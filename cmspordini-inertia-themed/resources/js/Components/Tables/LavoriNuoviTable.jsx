import React, { useMemo } from "react";
import { Content } from "../Content";
import { DataTable } from "./DataTable";
import {
    Allegati,
    Azioni,
    mapOrders,
    RagioneSociale,
    TableColumn,
} from "../TableFields";

const LavoriNuoviTable = ({ lavori, handleFile, handleIncarico }) => {
    const ragioneSocialeCell = useMemo(
        () => (params) => RagioneSociale(params.row),
        []
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
    );

    const azioniCell = useMemo(
        () => (params) => Azioni(params.row, "nuovi", handleIncarico),
        [handleIncarico]
    );

    const columns = useMemo(
        () => [
            TableColumn(
                "ragione_sociale",
                "Ragione sociale",
                200,
                "",
                ragioneSocialeCell
            ),
            TableColumn("medicoOrdinante", "Medico ordinante", 200, ""),
            TableColumn("Paziente", "Paziente", 200, ""),
            TableColumn("data", "Data ordine", 100, ""),
            TableColumn("Allegati", "Allegati", 80, "", allegatiCell, false),
            TableColumn("Azioni", "Azioni", 70, "", azioniCell, false),
        ],
        []
    );

    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            <Content.Layout title={"Lavori nuovi"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriNuoviTable;
