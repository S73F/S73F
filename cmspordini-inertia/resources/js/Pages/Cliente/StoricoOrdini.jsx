import React, { useEffect, useState } from "react";
import "../../../css/storicoOrdini.css";
import Layout from "../../Layouts/Layout";

export default function StoricoOrdini() {
    const [tempo, setTempo] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        const tempo = e.target.value;
        setTempo(tempo);
    };

    useEffect(() => {
        if (tempo) {
            fetch(`/cliente/ordini/storico/tempo?q=${tempo}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                });
        }
    }, [tempo]);

    return (
        <div id="orders-history">
            <h2 id="orders-history-title">Storico ordini</h2>

            <select
                id="selector"
                name="tempo"
                onChange={handleChange}
                defaultValue=""
            >
                <option disabled value="">
                    Lasso di tempo
                </option>
                <option className="select-element" value="30">
                    30 giorni
                </option>
                <option className="select-element" value="60">
                    60 giorni
                </option>
                <option disabled>---</option>
                <option className="select-element" value="tutto">
                    Tutto
                </option>
            </select>

            {data && (
                <div className="table-container">
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
                            {data.map((ordine) => {
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
                </div>
            )}
        </div>
    );
}

StoricoOrdini.layout = (page) => <Layout>{page}</Layout>;
