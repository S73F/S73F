import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";

export const useOrdiniClientiTable = ({ ordini }) => {
    const columns = useMemo(
        () => [
            {
                name: "Dottore",
                selector: (row) => row.medicoOrdinante,
                sortable: true,
            },
            {
                name: "Paziente",
                selector: (row) => row.PazienteCognome,
                cell: (row) => (
                    <div>
                        {row.PazienteCognome} {row.PazienteNome}`
                    </div>
                ),
                sortable: true,
            },
            {
                name: "Data ordine",
                selector: (row) => row.data,
                sortable: true,
            },
            {
                name: "Inizio lavoro",
                selector: (row) => row.data_inizioLavorazione,
                sortable: true,
            },
            {
                name: "Data spedizione",
                selector: (row) => row.data_spedizione,
                sortable: true,
            },
            {
                name: "Operatore",
                selector: (row) => row.operatore?.cognome,
                cell: (row) =>
                    row.operatore
                        ? `${row.operatore?.cognome || ""} ${
                              row.operatore?.nome || ""
                          }`
                        : "Nessun operatore",
                sortable: true,
            },
            {
                name: "Allegati",
                cell: (row) => (
                    <a
                        href={`/operatore/ordini-clienti/pdf/${row.IDordine}`}
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                    </a>
                ),
            },
        ],
        [ordini]
    );

    const [records, setRecords] = useState(ordini);

    useEffect(() => {
        setRecords(ordini);
    }, [ordini]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newOrdini = ordini.filter((row) => {
            const pazienteCognomeNome =
                row.PazienteCognome + " " + row.PazienteNome;
            const pazienteNomeCognome =
                row.PazienteNome + " " + row.PazienteCognome;
            const operatoreCognomeNome =
                row.operatore?.cognome + " " + row.operatore?.nome;
            const operatoreNomeCognome =
                row.operatore?.nome + " " + row.operatore?.cognome;

            return (
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                pazienteCognomeNome.toLowerCase().includes(searchText) ||
                pazienteNomeCognome.toLowerCase().includes(searchText) ||
                row.data.includes(searchText) ||
                row.data_inizioLavorazione?.includes(searchText) ||
                row.data_spedizione?.includes(searchText) ||
                operatoreCognomeNome.toLowerCase().includes(searchText) ||
                operatoreNomeCognome.toLowerCase().includes(searchText)
            );
        });

        setRecords(newOrdini);
    };

    return { records, columns, handleFilter };
};
