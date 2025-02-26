import React from "react";
import "../../css/table.css";
import "../../css/lavori.css";

import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

const LavoriNuovi = ({ lavori }) => {
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

    const handleIncarico = (IDordine) => {
        router.patch(`/operatore/ordini-clienti/update/${IDordine}`);
    };

    return (
        <div id="table-container">
            <h3 className="tipo-lavori">Lavori Nuovi</h3>
            <table id="table-content">
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
                        <th>Azioni</th>
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
                                    <button
                                        className="btn-link"
                                        onClick={() =>
                                            handleFile(lavoro.IDordine)
                                        }
                                    >
                                        File
                                    </button>
                                    <hr />
                                    <a
                                        href={`/operatore/ordini-clienti/pdf/${lavoro.IDordine}`}
                                        target="_blank"
                                    >
                                        Pdf
                                    </a>
                                </td>
                                <td>
                                    <button
                                        className="btn-link"
                                        onClick={() =>
                                            handleIncarico(lavoro.IDordine)
                                        }
                                    >
                                        Accetta incarico
                                    </button>
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
