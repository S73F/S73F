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

/**
 * Componente che visualizza la tabella dei lavori nuovi.
 * Gestisce la visualizzazione di vari dettagli sui lavori, come ragione sociale, medico ordinante, paziente, data ordine, allegati e azioni.
 *
 * @param {Object[]} lavori - Lista dei lavori da visualizzare nella tabella. Ogni lavoro è un oggetto con informazioni come medico ordinante, paziente, etc.
 * @param {Function} handleFile - Funzione per gestire i download dei file allegati.
 * @param {Function} handleIncarico - Funzione per gestire le azioni sui lavori.
 * @returns {JSX.Element} Una sezione che contiene la tabella dei lavori nuovi.
 */
const LavoriNuoviTable = ({ lavori, handleFile, handleIncarico }) => {
    // Memoizzazione della cella "Ragione sociale" per evitare ricalcoli inutili
    const ragioneSocialeCell = useMemo(
        () => (params) => RagioneSociale(params.row),
        []
    );

    // Memoizzazione della cella "Allegati"
    const allegatiCell = useMemo(
        () => (params) => Allegati(params.row, "operatore", handleFile),
        [handleFile] // Dipende dalla funzione handleFile
    );

    // Memoizzazione della cella "Azioni"
    const azioniCell = useMemo(
        () => (params) => Azioni(params.row, "nuovi", handleIncarico),
        [handleIncarico] // Dipende dalla funzione handleIncarico
    );

    // Definizione delle colonne della tabella
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

    // Mappatura dei lavori tramite la funzione mapOrders
    const mappedLavori = useMemo(() => mapOrders(lavori), [lavori]);

    return (
        <>
            {/* Titolo della tabella */}
            <Content.Layout title={"Lavori nuovi"} />
            {/* Tabella dei lavori nuovi, passando le righe e le colonne */}
            <DataTable.Table rows={mappedLavori} columns={columns} />;
        </>
    );
};

export default LavoriNuoviTable;
