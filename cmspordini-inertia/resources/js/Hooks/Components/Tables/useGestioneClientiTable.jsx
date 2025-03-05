import { ModalLink } from "@inertiaui/modal-react";
import React, { useEffect, useMemo, useState } from "react";

export const useGestioneClientiTable = ({ clienti, handleDelete }) => {
    const columns = useMemo(
        () => [
            {
                name: "Ragione sociale",
                selector: (row) => row.ragione_sociale,
                cell: (row) => (
                    <ModalLink
                        href={`/operatore/gestione-clienti/modifica/${row.IDcliente}`}
                    >
                        {row.ragione_sociale}
                    </ModalLink>
                ),
                sortable: true,
            },
            {
                name: "Nome",
                selector: (row) => row.cognome + " " + row.nome,
                sortable: true,
            },
            {
                name: "Email",
                selector: (row) => row.emailcliente,
                cell: (row) => (
                    <a href={`mailto:${row.emailcliente}`}>
                        {row.emailcliente}
                    </a>
                ),
                sortable: true,
            },
            {
                name: "Username",
                selector: (row) => row.username,
                sortable: true,
            },
            {
                name: "Azioni",
                cell: (row) => (
                    <div>
                        <ModalLink
                            id="edit-btn"
                            href={`/operatore/gestione-clienti/modifica/${row.IDcliente}`}
                            title="Modifica cliente"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 3l5 5L8 21H3v-5L16 3z" />
                                <path d="M15 4l5 5" />
                            </svg>
                        </ModalLink>

                        <button
                            id="delete-btn"
                            onClick={() => handleDelete(row.IDcliente)}
                            title="Elimina cliente"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M4 6l1 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-14" />
                            </svg>
                        </button>
                    </div>
                ),
            },
        ],
        [handleDelete]
    );

    const [records, setRecords] = useState(clienti);

    useEffect(() => {
        setRecords(clienti);
    }, [clienti]);

    const handleFilter = (event) => {
        const searchText = event.target.value.toLowerCase();

        const newClienti = clienti.filter((row) => {
            const clienteCognomeNome = row.cognome + " " + row.nome;
            const clienteNomeCognome = row.nome + " " + row.cognome;

            return (
                row.ragione_sociale.toLowerCase().includes(searchText) ||
                clienteCognomeNome.toLowerCase().includes(searchText) ||
                clienteNomeCognome.toLowerCase().includes(searchText) ||
                row.emailcliente.includes(searchText) ||
                row.username.toLowerCase().includes(searchText)
            );
        });

        setRecords(newClienti);
    };

    return { records, columns, handleFilter };
};
