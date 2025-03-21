import {
    faFilePdf,
    faFileZipper,
    faSquareCheck,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalLink } from "@inertiaui/modal-react";
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
                <>
                    <button
                        title="File sorgente"
                        className="btn-link"
                        onClick={() => handleFile("sorgente", row.IDordine)}
                    >
                        <FontAwesomeIcon icon={faFileZipper} size="2xl" />
                    </button>
                    <a
                        title="File PDF"
                        href={`/operatore/ordini-clienti/pdf/${row.IDordine}`}
                        target="_blank"
                    >
                        <FontAwesomeIcon icon={faFilePdf} size="2xl" />
                    </a>
                </>
            ),
        },
        {
            name: "Azioni",
            cell: (row) => (
                <>
                    <button
                        title="Accetta incarico"
                        className="btn-link"
                        onClick={() => handleIncarico(row.IDordine)}
                    >
                        <FontAwesomeIcon icon={faSquareCheck} size="2xl" />
                    </button>
                    <ModalLink
                        title="Elimina lavoro"
                        className="btn-link"
                        href={`/operatore/lavori/eliminazione/${row.IDordine}`}
                    >
                        <FontAwesomeIcon icon={faTrashCan} size="2xl" />
                    </ModalLink>
                </>
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
