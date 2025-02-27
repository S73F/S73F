import React from "react";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import Table from "./Tables/Table";

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
        <Table.Layout title={"Lavori Nuovi"} data={lavori}>
            <Table.Content>
                <Table.Head>
                    <th>
                        Richiedente
                        <hr />
                        Ragione Sociale
                    </th>
                    <th>Paziente</th>
                    <th>Data ordine</th>
                    <th>Allegati</th>
                    <th>Azioni</th>
                </Table.Head>
                <Table.Body
                    data={lavori}
                    renderRow={(lavoro) => (
                        <>
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
                                    onClick={() => handleFile(lavoro.IDordine)}
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
                        </>
                    )}
                />
            </Table.Content>
        </Table.Layout>
    );
};

export default LavoriNuovi;
