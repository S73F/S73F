import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import {
    Allegati,
    Azioni,
    DataInizioLavorazione,
    mapOrders,
    MedicoAndRagioneSociale,
    TableColumn,
} from "../TableFields";

const LavoriInCorsoTable = ({ lavori, handleFile, handleIncarico }) => {
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
            TableColumn("Operatore", "Operatore", 110, ""),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                170,
                "",
                (params) => <DataInizioLavorazione rowParams={params.row} />
            ),
            TableColumn(
                "Allegati",
                "Allegati",
                100,
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
                "Azioni",
                "Azioni",
                120,
                "",
                (params) => (
                    <Azioni
                        rowParams={params.row}
                        tipoLavori={"inCorso"}
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
            <ContentContainer.Layout title={"Lavori in corso"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />
        </>
    );
};

export default LavoriInCorsoTable;
