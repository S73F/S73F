import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import {
    Allegati,
    Azioni,
    mapOrders,
    RagioneSociale,
    TableColumn,
} from "../TableFields";

const LavoriNuoviTable = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            TableColumn(
                "ragione_sociale",
                "Ragione sociale",
                200,
                "",
                (params) => <RagioneSociale rowParams={params.row} />
            ),
            TableColumn("medicoOrdinante", "Medico ordinante", 200, ""),
            TableColumn("Paziente", "Paziente", 200, ""),
            TableColumn("data", "Data ordine", 100, ""),
            TableColumn(
                "",
                "Allegati",
                80,
                "",
                (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"operatore"}
                        handleFile={handleFile}
                    />
                ),
                false
            ),
            TableColumn(
                "",
                "Azioni",
                70,
                "",
                (params) => (
                    <Azioni
                        rowParams={params.row}
                        tipoLavori={"nuovi"}
                        handleIncarico={handleIncarico}
                    />
                ),
                false
            ),
        ],
        []
    );

    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            <ContentContainer.Layout title={"Lavori nuovi"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriNuoviTable;
