import React from "react";
import "../../css/storicoOrdiniTable.css";
import Pagination from "./Pagination";

export default function StoricoOrdiniTable({ ordini }) {
    return (
        <div className="table-container-storico">
            <table>
                <thead>
                    <tr>
                        <th>Data Ordine</th>
                        <th>Richiedente</th>
                        <th>Nome Paziente</th>
                        <th>Cognome Paziente</th>
                        <th>Indirizzo</th>
                        <th>Inizio Lavoro</th>
                        <th>Stato Lavoro</th>
                        <th>Spedizione</th>
                        <th>PDF</th>
                    </tr>
                </thead>
                <tbody>
                    {ordini.data.map((ordine) => {
                        return (
                            <tr key={ordine.IDordine}>
                                <td>{ordine.data}</td>
                                <td>{ordine.medicoOrdinante}</td>
                                <td>{ordine.PazienteNome}</td>
                                <td>{ordine.PazienteCognome}</td>
                                <td>{ordine.IndirizzoSpedizione}</td>
                                <td>
                                    {ordine.data_inizioLavorazione
                                        ? ordine.data_inizioLavorazione
                                        : "-"}
                                </td>
                                <td>
                                    {ordine.stato === 0
                                        ? "Nuovo"
                                        : ordine.stato === 1
                                        ? "In lavorazione"
                                        : "Spedito"}
                                </td>
                                <td>
                                    {ordine.data_spedizione
                                        ? ordine.data_spedizione
                                        : "-"}
                                </td>
                                <td>
                                    <a
                                        href={`/cliente/ordini/${ordine.IDordine}`}
                                        target="_blank"
                                    >
                                        Visualizza PDF
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {ordini.links.length > 1 && <Pagination links={ordini.links} />}
        </div>
    );
}
