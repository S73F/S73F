import React, { useEffect, useMemo, useState } from "react";
import { ModalLink } from "@inertiaui/modal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faFileZipper,
    faPenToSquare,
    faShareFromSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
    faFileZipper as faFileZipperSolid,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export const useLavoriInCorso = ({
    lavori,
    handleFile,
    handleFileFinale,
    handleIncarico,
}) => {
    const [records, setRecords] = useState([]);

    const columns = useMemo(
        () => [
            {
                name: "Richiedente",
                selector: (row) => row.medicoOrdinante,
                sortable: true,
            },
            {
                name: "Paziente",
                selector: (row) => row.PazienteCognome,
                cell: (row) => `${row.PazienteCognome} ${row.PazienteNome}`,
                sortable: true,
            },
            {
                name: "Operatore",
                selector: (row) => row.operatore?.cognome,
                cell: (row) =>
                    `${row.operatore?.cognome ?? ""} ${
                        row.operatore?.nome ?? ""
                    }`,
                sortable: true,
            },
            {
                name: <div>Inizio lavorazione</div>,
                selector: (row) => row.data_inizioLavorazione,
                cell: (row) => (
                    <div>
                        {row.data_inizioLavorazione
                            ? row.data_inizioLavorazione
                            : ""}
                        {row.note_ulti_mod && (
                            <div id="last-modified">
                                {`Ultima modifica:`}
                                <br />
                                {row.note_ulti_mod}
                            </div>
                        )}
                    </div>
                ),
                sortable: true,
            },
            {
                name: "Allegati",
                cell: (row) => (
                    <>
                        <button
                            title="File sorgente"
                            className="btn-link"
                            onClick={() => handleFile(row.IDordine)}
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
                        {row.file_fin === 1 && (
                            <button
                                title="File finale"
                                className="btn-link"
                                onClick={() => handleFileFinale(row.IDordine)}
                            >
                                <FontAwesomeIcon
                                    icon={faFileZipperSolid}
                                    size="2xl"
                                />
                            </button>
                        )}
                    </>
                ),
            },
            {
                name: "Azioni",
                cell: (row) => (
                    <>
                        <button
                            title="Annulla incarico"
                            className="btn-link"
                            onClick={() => handleIncarico(row.IDordine, "back")}
                        >
                            <FontAwesomeIcon icon={faRotateLeft} size="2xl" />
                        </button>
                        <ModalLink
                            title="Modifica lavorazione"
                            href={`/operatore/ordini-clienti/caricamento-lavorazione/${row.IDordine}`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                        </ModalLink>
                        {row.file_fin === 1 && (
                            <button
                                title="Spedisci lavoro"
                                className="btn-link"
                                onClick={() => handleIncarico(row.IDordine)}
                            >
                                <FontAwesomeIcon
                                    icon={faShareFromSquare}
                                    size="2xl"
                                />
                            </button>
                        )}
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
        ],
        []
    );

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
            const operatoreCognomeNome =
                row.operatore.cognome + " " + row.operatore.nome;
            const operatoreNomeCognome =
                row.operatore.nome + " " + row.operatore.cognome;

            return (
                row.medicoOrdinante.toLowerCase().includes(searchText) ||
                row.cliente.ragione_sociale
                    .toLowerCase()
                    .includes(searchText) ||
                pazienteCognomeNome.toLowerCase().includes(searchText) ||
                pazienteNomeCognome.toLowerCase().includes(searchText) ||
                row.cliente.emailcliente.toLowerCase().includes(searchText) ||
                row.data.includes(searchText) ||
                row.note_ulti_mod?.includes(searchText) ||
                operatoreCognomeNome.toLowerCase().includes(searchText) ||
                operatoreNomeCognome.toLowerCase().includes(searchText) ||
                row.data_inizioLavorazione.includes(searchText) ||
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
