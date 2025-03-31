import React, { useMemo } from "react";
import { Content } from "../Content";
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
    const medicoAndRagioneSocialeCell = useMemo(
        () => (params) => MedicoAndRagioneSociale(params.row),
        []
    );

    const dataInizioLavorazioneCell = useMemo(
        () => (params) => DataInizioLavorazione(params.row)
    );

    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile]
    );

    const azioniCell = useMemo(
        () => (params) => Azioni(params.row, "inCorso", handleIncarico),
        [handleIncarico]
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
            TableColumn("Operatore", "Operatore", 110, ""),
            TableColumn(
                "data_inizioLavorazione",
                "Data inizio lavorazione",
                170,
                "",
                dataInizioLavorazioneCell
            ),
            TableColumn("Allegati", "Allegati", 100, "", allegatiCell, false),
            TableColumn("Azioni", "Azioni", 120, "", azioniCell, false),
        ],
        []
    );

    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            <Content.Layout title={"Lavori in corso"} />
            <DataTable.Table rows={mappedLavori} columns={columns} />
        </>
    );
};

export default LavoriInCorsoTable;
