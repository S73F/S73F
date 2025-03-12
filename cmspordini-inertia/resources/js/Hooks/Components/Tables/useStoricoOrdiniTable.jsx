import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState, useMemo } from "react";

export default function useStoricoOrdiniTable({ ordini }) {
    const columns = useMemo(
        () => [
            {
                name: "Data Ordine",
                selector: (row) => row.data,
                sortable: true,
            },
            {
                name: "Richiedente",
                selector: (row) => row.medicoOrdinante,
                sortable: true,
            },
            {
                name: "Inizio lavoro",
                selector: (row) => row.data_inizioLavorazione,
                sortable: true,
            },
            {
                name: "Stato lavoro",
                selector: (row) => row.stato,
                cell: (row) =>
                    row.stato === 0
                        ? "Nuovo"
                        : row.stato === 1
                        ? "In lavorazione"
                        : "Spedito",
                sortable: true,
            },
            {
                name: "Spedizione",
                cell: (row) =>
                    row.data_spedizione === null ? "-" : row.data_spedizione,
                sortable: true,
            },
            {
                name: "PDF",
                cell: (row) => (
                    <a
                        href={`/cliente/ordini/pdf/${row.IDordine}`}
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                    </a>
                ),
            },
        ],
        []
    );

    const [records, setRecords] = useState(ordini);

    useEffect(() => {
        setRecords(ordini);
    }, [ordini]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newOrdini = ordini.filter((row) => {
            return (
                row.data.includes(searchText) ||
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                row.PazienteNome.toLowerCase().includes(searchText) ||
                row.PazienteCognome.toLowerCase().includes(searchText) ||
                row.IndirizzoSpedizione.toLowerCase().includes(searchText) ||
                row.data_inizioLavorazione?.includes(searchText) ||
                row.data_spedizione?.includes(searchText)
            );
        });

        setRecords(newOrdini);
    };

    return { records, columns, handleFilter };
}
