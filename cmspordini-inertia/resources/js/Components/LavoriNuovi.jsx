import React from "react";
import "../../css/table.css";
import "../../css/lavori.css";

import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

const LavoriNuovi = ({ lavori }) => {
    const handlePDF = (IDordine) => {
        router.patch(`/operatore/ordini-clienti/update/${IDordine}`);
        toast.success(
            "Hai preso in carico il lavoro. Caricamento PDF in corso...",
            {
                position: "top-center",
                autoClose: 3400,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            }
        );

        setTimeout(() => {
            window.open(`/operatore/ordini-clienti/pdf/${IDordine}`, "_blank");
        }, 4000);
    };

    const handleFile = (IDordine) => {
        window.location.href = `/operatore/ordini-clienti/download/${IDordine}`;
        router.patch(`/operatore/ordini-clienti/update/${IDordine}`);
        toast.success(
            "Hai preso in carico il lavoro. Download del file in corso...",
            {
                position: "top-center",
                autoClose: 3500,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            }
        );
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
                                    <button
                                        onClick={() =>
                                            handlePDF(lavoro.IDordine)
                                        }
                                        className="btn-link"
                                    >
                                        Pdf
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
