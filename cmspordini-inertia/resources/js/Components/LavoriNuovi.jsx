import React from "react";
import "../../css/lavori.css";

const LavoriNuovi = ({ lavori }) => {
    return (
        <div id="table-container">
            <h3 className="tipo-lavori">Lavori Nuovi</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Richiedente
                            <hr />
                            Ragione Sociale
                        </th>
                        <th>Paziente</th>
                        <th>Data ordine</th>
                        <th>Allegati</th>
                    </tr>
                </thead>
                <tbody>
                    {lavori.map((lavoro) => {
                        return (
                            <tr key={lavoro.IDordine}>
                                <td>
                                    {lavoro.medicoOrdinante}
                                    <hr />
                                    <strong>
                                        {lavoro.cliente.ragione_sociale}
                                    </strong>
                                </td>
                                <td>
                                    <a>
                                        {lavoro.PazienteCognome}{" "}
                                        {lavoro.PazienteNome}
                                    </a>
                                </td>
                                <td>{lavoro.data}</td>
                                <td>
                                    <a>File</a>
                                    <br />
                                    <a>Pdf</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default LavoriNuovi;
