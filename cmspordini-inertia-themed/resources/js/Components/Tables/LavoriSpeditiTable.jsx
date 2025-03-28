import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import { Allegati, MedicoAndRagione } from "../TableFields";

const LavoriSpeditiTable = ({ lavori, handleFile }) => {
    const columns = useMemo(
        () => [
            {
                field: "medicoOrdinante",
                headerName: "Medico ordinante",
                flex: 1,
                minWidth: 220,
                headerClassName: "headerColumn",
                renderCell: (params) => (
                    <MedicoAndRagione rowParams={params.row} />
                ),
            },
            {
                field: "Paziente",
                headerName: "Paziente",
                flex: 1,
                minWidth: 170,
                headerClassName: "headerColumn",
            },
            {
                field: "Data ordine",
                headerName: "Data ordine",
                flex: 1,
                minWidth: 140,
                maxWidth: 140,
                headerClassName: "headerColumn",
            },
            {
                field: "Data inizio lavorazione",
                headerName: "Data inizio lavorazione",
                flex: 1,
                minWidth: 140,
                maxWidth: 140,
                headerClassName: "headerColumn",
            },
            {
                field: "Data spedizione",
                headerName: "Data spedizione",
                flex: 1,
                minWidth: 140,
                maxWidth: 140,
                headerClassName: "headerColumn",
            },
            {
                field: "Operatore",
                headerName: "Operatore",
                flex: 1,
                minWidth: 110,
                headerClassName: "headerColumn",
            },
            {
                field: "Allegati",
                headerName: "Allegati",
                flex: 1,
                minWidth: 90,
                headerClassName: "headerColumn",
                sortable: false,
                filterable: false,
                renderCell: (params) => (
                    <Allegati
                        rowParams={params.row}
                        user={"operatore"}
                        handleFile={handleFile}
                    />
                ),
            },
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
