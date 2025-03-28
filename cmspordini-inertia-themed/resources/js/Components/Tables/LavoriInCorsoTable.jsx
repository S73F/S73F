import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import {
    Allegati,
    Azioni,
    DataInizioLavorazione,
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
                "",
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
                "",
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

    const mapLavoriInCorso = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                idCliente: lavoro.IDcliente,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                medicoOrdinante: lavoro.medicoOrdinante,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                Operatore:
                    (lavoro.operatore?.nome || "") +
                    " " +
                    (lavoro.operatore?.cognome || ""),
                data_inizioLavorazione: lavoro.data_inizioLavorazione || "-",
                file_fin: lavoro.file_fin,
                note_ulti_mod: lavoro.note_ulti_mod,
            })),
        [lavori]
    );

    return (
        <>
            <ContentContainer.Layout title={"Lavori in corso"} />
            <DataTable.Table rows={mapLavoriInCorso} columns={columns} />;
        </>
    );
};

export default LavoriInCorsoTable;
