import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileZipper } from "@fortawesome/free-regular-svg-icons";
import { faFileZipper as faFileZipperSolid } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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

    function handleFile(IDordine) {
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
    }

    function handleFileFinale(IDordine) {
        window.location.href = `/operatore/ordini-clienti/download-finale/${IDordine}`;

        setTimeout(() => {
            toast.success("Download del file finale in corso...", {
                position: "top-center",
                autoClose: 2000,
                closeOnClick: false,
                pauseOnHover: false,
                theme: "dark",
            });
        }, 1000);
    }

    // return { records, columns, handleFilter };
    return { handleFile, handleFileFinale };
};
