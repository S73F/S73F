import React from "react";
import Pagination from "./Pagination";
import "../../css/table.css";

export default function OrdiniClienteTable({ ordini }) {
    return (
        <div id="table-container">
            <table id="table-content">
                <thead>
                    <tr>
                        <th>Dottore</th>
                        <th>Paziente</th>
                        <th>Data ordine</th>
                        <th>Inizio lavoro</th>
                        <th>Spedizione</th>
                        <th>Operatore</th>
                        <th>Allegati</th>
                    </tr>
                </thead>
                <tbody>
                    {ordini.data.map((ordine) => (
                        <tr key={ordine.IDordine}>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {ordini.links?.length > 1 && <Pagination links={ordini.links} />}
        </div>
    );
}
