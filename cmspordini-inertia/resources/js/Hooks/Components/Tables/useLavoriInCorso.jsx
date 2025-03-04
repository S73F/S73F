import { ModalLink } from "@inertiaui/modal-react";
import React, { useEffect, useMemo, useState } from "react";

export const useLavoriInCorso = ({
    lavori,
    handleFile,
    handleIncarico,
    handleFileFinale,
}) => {
    const columns = useMemo(() => [
        {
            name: (
                <div className="hr-row">
                    {" "}
                    Richiedente
                    <hr />
                    Ragione sociale
                </div>
            ),
            selector: (row) => row.medicoOrdinante,
            cell: (row) => (
                <div className="hr-row">
                    {row.medicoOrdinante}
                    <hr />
                    {row.cliente.ragione_sociale}
                </div>
            ),
        },
        {
            name: "Paziente",
            selector: (row) => row.PazienteCognome,
            cell: (row) => (
                <div className="hr-row">
                    <a href="">{`${row.PazienteCognome} ${row.PazienteNome}`}</a>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Operatore",
            selector: (row) => row.operatore?.cognome,
            cell: (row) => (
                <div className="hr-row">
                    {`${row.operatore?.cognome ?? ""} ${
                        row.operatore?.nome ?? ""
                    }`}
                    <hr />
                    <ModalLink
                        href={`/operatore/ordini-clienti/caricamento-lavorazione/${row.IDordine}`}
                    >
                        Carica lavorazione
                    </ModalLink>
                </div>
            ),
            sortable: true,
        },
        {
            name: <div>Inizio lavorazione</div>,
            selector: (row) => row.data_inizioLavorazione,
            cell: (row) => (
                <div className="hr-row">
                    {row.data_inizioLavorazione
                        ? row.data_inizioLavorazione
                        : ""}
                    {row.note_ulti_mod && (
                        <div className="last-modified">
                            <hr />
                            {`Ultima modifica:`}
                            <br />
                            {row.note_ulti_mod}
                        </div>
                    )}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Allegati",
            cell: (row) => (
                <div className="hr-row allegati">
                    <button
                        className="btn-link"
                        onClick={() => handleFile(row.IDordine)}
                    >
                        Sorgente
                    </button>
                    <hr />
                    <a
                        href={`/operatore/ordini-clienti/pdf/${row.IDordine}`}
                        target="_blank"
                    >
                        Pdf
                    </a>
                    {row.file_fin === 1 && (
                        <>
                            <hr />
                            <button
                                className="btn-link"
                                onClick={() => handleFileFinale(row.IDordine)}
                            >
                                Finale
                            </button>
                        </>
                    )}
                </div>
            ),
        },
        {
            name: "Azioni",
            cell: (row) => (
                <button
                    className="btn-link"
                    onClick={() => handleIncarico(row.IDordine)}
                >
                    Spedisci lavoro
                </button>
            ),
        },
    ]);

    const [records, setRecords] = useState(lavori);

    useEffect(() => {
        setRecords(lavori);
    }, [lavori]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newLavori = lavori.filter((row) => {
            return (
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                row.cliente.ragione_sociale
                    .toLowerCase()
                    .includes(searchText) ||
                row.PazienteCognome.toLowerCase().includes(searchText) ||
                row.PazienteNome.toLowerCase().includes(searchText) ||
                row.cliente.emailcliente.toLowerCase().includes(searchText) ||
                row.data.includes(searchText) ||
                row.operatore.cognome.toLowerCase().includes(searchText) ||
                row.operatore.nome.toLowerCase().includes(searchText) ||
                row.data_inizioLavorazione.includes(searchText)
            );
        });

        setRecords(newLavori);
    };

    return { records, columns, handleFilter };
};

/* <Table.Layout title={"Lavori in Corso"} data={lavori}>
            <Table.Content>
                <Table.Head>
                    <th>
                        Richiedente
                        <hr />
                        Ragione Sociale
                    </th>
                    <th>Paziente</th>
                    <th>Data ordine</th>
                    <th>Operatore</th>
                    <th>Inizio lavorazione</th>
                    <th>Allegati</th>
                </Table.Head>
                <Table.Body
                    data={lavori.data}
                    renderRow={(lavoro) => (
                        <>
                            <td id="richiedente">
                                {lavoro.medicoOrdinante} <hr />{" "}
                                {lavoro.cliente.ragione_sociale}
                            </td>
                            <td>
                                <a>
                                    {lavoro.PazienteCognome}{" "}
                                    {lavoro.PazienteNome}
                                </a>
                                <br />
                                Ultima mod.: {lavoro.note_ulti_mod ?? "Nessuna"}
                                <hr />
                                <strong>
                                    <a
                                        href={`mailto:${lavoro.cliente.emailcliente}`}
                                    >
                                        {lavoro.cliente.emailcliente}
                                    </a>
                                </strong>
                            </td>
                            <td id="data-ordine">{lavoro.data}</td>
                            <td>
                                {lavoro.operatore?.nome ?? ""}{" "}
                                {lavoro.operatore?.cognome ?? ""} <hr />{" "}
                                <ModalLink
                                    href={`/operatore/ordini-clienti/caricamento-lavorazione/${lavoro.IDordine}`}
                                >
                                    Carica lavorazione
                                </ModalLink>
                            </td>
                            <td id="inizio-lavorazione">
                                {lavoro.data_inizioLavorazione
                                    ? lavoro.data_inizioLavorazione
                                    : ""}
                            </td>
                            <td>
                                <button
                                    className="btn-link"
                                    onClick={() => handleFile(lavoro.IDordine)}
                                >
                                    Sorgente
                                </button>
                                <hr />
                                <a
                                    href={`/operatore/ordini-clienti/pdf/${lavoro.IDordine}`}
                                    target="_blank"
                                >
                                    Pdf
                                </a>
                            </td>
                        </>
                    )}
                /> */
