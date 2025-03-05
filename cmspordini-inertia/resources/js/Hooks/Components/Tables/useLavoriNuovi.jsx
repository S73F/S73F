import { router } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";

export const useLavoriNuovi = ({ handleFile }) => {
    const [lavori, setLavori] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/operatore/lavori/nuovi")
            .then((response) => response.json())
            .then((data) => {
                console.log("Lavori ricevuti: ", data);
                setLavori(data.lavori);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

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
                    onClick={() => handleIncarico(row.IDordine)}
                >
                    Accetta incarico
                </button>
            ),
        },
    ]);

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

        setLavori(newLavori);
    };

    function handleIncarico(IDordine) {
        router.patch(`/operatore/ordini-clienti/update/${IDordine}`);

        setLavori((prevLavori) => {
            if (!prevLavori || prevLavori.length === 0) {
                console.error("Dati non disponibili");
                return prevLavori;
            }

            const updatedLavori = prevLavori.filter(
                (row) => row.IDordine !== IDordine
            );
            return updatedLavori;
        });
    }

    return { loading, lavori, columns, handleFilter };
};
