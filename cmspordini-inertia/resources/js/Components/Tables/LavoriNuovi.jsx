import React, { useMemo } from "react";
import "../../../css/tableStyles.css";
import DataTable from "react-data-table-component";

const LavoriNuovi = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(() => [
        {
            name: (
                <div>
                    Richiedente
                    <hr />
                    Ragione sociale
                </div>
            ),
            cell: (row) => (
                <div>
                    {row.medicoOrdinante}
                    <hr />
                    {row.cliente.ragione_sociale}
                </div>
            ),
        },
        {
            name: "Paziente",
            selector: (row) => `${row.PazienteCognome} ${row.PazienteNome}`,
        },
        {
            name: "Data",
            selector: (row) => row.data,
        },
        {
            name: "Allegati",
            cell: (row) => (
                <div>
                    <button
                        className="btn-link"
                        onClick={() => handleFile(row.IDordine)}
                    >
                        File
                    </button>
                    <hr />
                    <a
                        href={`/operatore/ordini-clienti/pdf/${row.IDordine}`}
                        target="_blank"
                    >
                        PDF
                    </a>
                </div>
            ),
        },
        {
            name: "Azioni",
            cell: (row) => (
                <button
                    className="btn-link"
                    onClick={() => handleIncarico(row.IDordine)}
                >
                    Accetta incarico
                </button>
            ),
        },
    ]);

    return (
        <DataTable
            className="custom-table"
            columns={columns}
            data={lavori}
            pagination
            fixedHeader
        />
    );

    // return (
    //     <Table.Layout title={"Lavori Nuovi"} data={lavori}>
    //         <Table.Content>
    //             <Table.Head>
    //                 <th>
    //                     Richiedente
    //                     <hr />
    //                     Ragione Sociale
    //                 </th>
    //                 <th>Paziente</th>
    //                 <th>Data ordine</th>
    //                 <th>Allegati</th>
    //                 <th>Azioni</th>
    //             </Table.Head>
    //             <Table.Body
    //                 data={lavori}
    //                 renderRow={(lavoro) => (
    //                     <>
    //                         <td>
    //                             {lavoro.medicoOrdinante}
    //                             <hr />
    //                             <strong>
    //                                 {lavoro.cliente.ragione_sociale}
    //                             </strong>
    //                         </td>
    //                         <td>
    //                             <a>
    //                                 {lavoro.PazienteCognome}{" "}
    //                                 {lavoro.PazienteNome}
    //                             </a>
    //                         </td>
    //                         <td>{lavoro.data}</td>
    //                         <td>
    //                             <button
    //                                 className="btn-link"
    //                                 onClick={() => handleFile(lavoro.IDordine)}
    //                             >
    //                                 File
    //                             </button>
    //                             <hr />
    //                             <a
    //                                 href={`/operatore/ordini-clienti/pdf/${lavoro.IDordine}`}
    //                                 target="_blank"
    //                             >
    //                                 Pdf
    //                             </a>
    //                         </td>
    //                         <td>
    //                             <button
    //                                 className="btn-link"
    //                                 onClick={() =>
    //                                     handleIncarico(lavoro.IDordine)
    //                                 }
    //                             >
    //                                 Accetta incarico
    //                             </button>
    //                         </td>
    //                     </>
    //                 )}
    //             />
    //         </Table.Content>
    //     </Table.Layout>
    // );
};

export default LavoriNuovi;
