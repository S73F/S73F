import React, { useEffect, useMemo, useState } from "react";

export const useLavoriNuovi = ({ lavori, handleFile, handleIncarico }) => {
    const [records, setRecords] = useState([]);

    const columns = useMemo(() => [
        {
            name: "Richiedente",
            selector: (row) => row.medicoOrdinante,
            sortable: true,
        },
        {
            name: "Paziente",
            cell: (row) => (
                <a>
                    {row.PazienteCognome} {row.PazienteNome}
                </a>
            ),
            sortable: true,
        },
        {
            name: "Data",
            selector: (row) => row.data,
            sortable: true,
        },
        {
            name: "Allegati",
            cell: (row) => (
                <div className="hr-row">
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
                    onClick={() => handleIncarico(row.IDordine, 0)}
                >
                    Accetta incarico
                </button>
            ),
        },
    ]);

    useEffect(() => {
        setRecords(lavori ?? []);
    }, [lavori]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newLavori = lavori.filter((row) => {
            const pazienteCognomeNome =
                row.PazienteCognome + " " + row.PazienteNome;
            const pazienteNomeCognome =
                row.PazienteNome + " " + row.PazienteCognome;

            return (
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                pazienteCognomeNome.toLowerCase().includes(searchText) ||
                pazienteNomeCognome.toLowerCase().includes(searchText) ||
                row.data.includes(searchText) ||
                row.cliente.ragione_sociale
                    .toLowerCase()
                    .includes(searchText) ||
                row.cliente.emailcliente.toLowerCase().includes(searchText)
            );
        });

        setRecords(newLavori);
    };

    return { columns, records, handleFilter };
};
