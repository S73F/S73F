import React from "react";

export default function OrdiniClienteTable({ ordini }) {
    return (
        <div className="table-container-ordini-cliente">
            <table>
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
                    {ordini.map((ordine) => (
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
                                    <a href="">File</a> e <a href="">PDF</a>
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
