import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import { Allegati, MedicoAndRagioneSociale, TableColumn } from "../TableFields";

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
            TableColumn("Data ordine", "Data ordine", 140, 140),
            TableColumn(
                "Data inizio lavorazione",
                "Data inizio lavorazione",
                140,
                140
            ),
            TableColumn("Data spedizione", "Data spedizione", 140, 140),
            TableColumn("Operatore", "Operatore", 110, ""),
            TableColumn(
                "",
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

    const mapLavori = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                idCliente: lavoro.IDcliente,
                medicoOrdinante: lavoro.medicoOrdinante,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                "Data ordine": lavoro.data || "-",
                "Data inizio lavorazione": lavoro.data_inizioLavorazione || "-",
                "Data spedizione": lavoro.data_spedizione || "-",
                Operatore: lavoro.operatore
                    ? `${lavoro.operatore?.cognome || ""} ${
                          lavoro.operatore?.nome || ""
                      }`
                    : "Nessun operatore",
                file_fin: lavoro.file_fin,
            })),
        [lavori]
    );

    return (
        <>
            <ContentContainer.Layout title={"Lavori spediti"} />
            <DataTable.Table rows={mapLavori} columns={columns} />;
        </>
    );
};

export default LavoriSpeditiTable;
