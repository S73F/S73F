import React from "react";
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

    return (
        <div id="table-container-lavori">
            <h3 className="tipo-lavori">Lavori Nuovi</h3>
            <table>
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
                                    <button
                                        onClick={() =>
                                            handlePDF(lavoro.IDordine)
                                        }
                                        id="btn-link"
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
