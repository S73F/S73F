import React, { useEffect, useMemo, useState } from "react";

export const useLavoriNuovi = ({ lavori, handleFile, handleIncarico }) => {
    const columns = useMemo(() => [
        {
            name: (
                <div className="hr-row">
                    {" "}
                    Richiedente
                    <hr />
                    Ragione sociale
                </div>
            ),
            cell: (row) => (
                <div className="hr-row">
                    {row.medicoOrdinante}
                    <hr />
                    {row.cliente.ragione_sociale}
                </div>
            ),
        },
        {
            name: "Paziente",
            selector: (row) => `${row.PazienteCognome} ${row.PazienteNome}`,
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
                    onClick={() => handleIncarico(row.IDordine)}
                >
                    Accetta incarico
                </button>
            ),
        },
    ]);

    const [records, setRecords] = useState(lavori);

    useEffect(() => {
        setRecords(lavori);
    }, [lavori]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newLavori = lavori.filter((row) => {
            return (
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                row.PazienteNome.toLowerCase().includes(searchText) ||
                row.PazienteCognome.toLowerCase().includes(searchText) ||
                row.data.includes(searchText)
            );
        });

        setRecords(newLavori);
    };

    return { records, columns, handleFilter };
};
