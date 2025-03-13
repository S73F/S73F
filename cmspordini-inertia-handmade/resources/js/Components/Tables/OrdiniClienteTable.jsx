import React from "react";
import Table from "./Table";

export default function OrdiniClienteTable({ ordini }) {
    return (
        <Table.Layout data={ordini}>
            <Table.Content>
                <Table.Head>
                    <th>Dottore</th>
                    <th>Paziente</th>
                    <th>Data ordine</th>
                    <th>Inizio lavoro</th>
                    <th>Spedizione</th>
                    <th>Operatore</th>
                    <th>Allegati</th>
                </Table.Head>
                <Table.Body
                    data={ordini.data}
                    renderRow={(ordine) => (
                        <>
                            <td>{ordine.medicoOrdinante}</td>
                            <td>{`${ordine.PazienteNome} ${ordine.PazienteCognome}`}</td>
                            <td>{ordine.data}</td>
                            <td>{ordine.data_inizioLavorazione}</td>
                            <td>{ordine.data_spedizione}</td>
                            <td>
                                {ordine.operatore
                                    ? `${ordine.operatore?.nome || ""} ${
                                          ordine.operatore?.cognome || ""
                                      }`
                                    : "Nessun operatore"}
                            </td>
                            <td>
                                <p>
                                    <a
                                        href={`/operatore/ordini-clienti/pdf/${ordine.IDordine}`}
                                        target="_blank"
                                    >
                                        Visualizza PDF
                                    </a>
                                </p>
                            </td>
                        </>
                    )}
                />
            </Table.Content>
        </Table.Layout>
    );
}
