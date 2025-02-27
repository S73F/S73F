import React from "react";
import { toast } from "react-toastify";
import Table from "./Tables/Table";

const LavoriInCorso = ({ lavori }) => {
    const handleFile = (IDordine) => {
        window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;

        setTimeout(() => {
            toast.success("Download del file in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    };

    return (
        <Table.Layout title={"Lavori in Corso"} data={lavori}>
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
                                <a href="">Carica lavorazione</a>
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
                />
            </Table.Content>
        </Table.Layout>
    );
};

export default LavoriInCorso;
