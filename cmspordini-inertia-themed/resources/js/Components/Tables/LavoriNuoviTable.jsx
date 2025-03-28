import React, { useMemo } from "react";
import { ContentContainer } from "../ContentContainer";
import { DataTable } from "./DataTable";
import { Allegati, Azioni, RagioneSociale, TableColumn } from "../TableFields";

const LavoriNuoviTable = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(
        () => [
            TableColumn("ragione_sociale", "Ragione sociale", 200, (params) => (
                <RagioneSociale rowParams={params.row} />
            )),
            TableColumn("medicoOrdinante", "Medico ordinante", 200),
            TableColumn("Paziente", "Paziente", 200),
            TableColumn("Data ordine", "Data ordine", 100),
            TableColumn(
                "Allegati",
                "Allegati",
                80,
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
                70,
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

    const mapLavoriNuovi = useMemo(
        () =>
            lavori.map((lavoro) => ({
                id: lavoro.IDordine,
                idCliente: lavoro.IDcliente,
                ragione_sociale: lavoro.cliente.ragione_sociale,
                medicoOrdinante: lavoro.medicoOrdinante,
                Paziente: lavoro.PazienteCognome + " " + lavoro.PazienteNome,
                "Data ordine": lavoro.data || "-",
                "Data inizio lavorazione": lavoro.data_inizioLavorazione || "-",
            })),
        [lavori]
    );

    return (
        <>
            <ContentContainer.Layout title={"Lavori nuovi"} />
            <DataTable.Table rows={mapLavoriNuovi} columns={columns} />;
        </>
    );
};

export default LavoriNuoviTable;
