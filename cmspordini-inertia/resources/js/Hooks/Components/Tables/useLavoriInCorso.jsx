import React, { useEffect, useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { ModalLink } from "@inertiaui/modal-react";

export const useLavoriInCorso = ({ handleFile, handleFileFinale }) => {
    const [lavori, setLavori] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/operatore/lavori/inCorso")
            .then((response) => response.json())
            .then((data) => {
                console.log("Lavori ricevuti: ", data);
                setLavori(data.lavori);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

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
                cell: (row) => (
                    <div className="hr-row">
                        <a href="">{`${row.PazienteCognome} ${row.PazienteNome}`}</a>
                    </div>
                ),
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
                    <div className="hr-row">
                        {row.data_inizioLavorazione
                            ? row.data_inizioLavorazione
                            : ""}
                        {row.note_ulti_mod && (
                            <div className="last-modified">
                                <hr />
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
                    <div className="hr-row allegati">
                        <button
                            className="btn-link"
                            onClick={() => handleFile(row.IDordine)}
                        >
                            Sorgente
                        </button>
                        <hr />
                        <a
                            href={`/operatore/ordini-clienti/pdf/${row.IDordine}`}
                            target="_blank"
                        >
                            Pdf
                        </a>
                        {row.file_fin === 1 && (
                            <>
                                <hr />
                                <button
                                    className="btn-link"
                                    onClick={() =>
                                        handleFileFinale(row.IDordine)
                                    }
                                >
                                    Finale
                                </button>
                            </>
                        )}
                    </div>
                ),
            },
            {
                name: "Azioni",
                cell: (row) => (
                    <div className="hr-row">
                        <ModalLink
                            href={`/operatore/ordini-clienti/caricamento-lavorazione/${row.IDordine}`}
                        >
                            Carica lavorazione
                        </ModalLink>
                        <hr />
                        <button
                            className="btn-link"
                            onClick={() => handleIncarico(row.IDordine)}
                        >
                            Spedisci lavoro
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

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
