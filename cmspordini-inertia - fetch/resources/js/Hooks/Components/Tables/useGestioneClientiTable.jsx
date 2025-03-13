import {
    faPenToSquare,
    faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalLink } from "@inertiaui/modal-react";
import React, { useEffect, useMemo, useState } from "react";

export const useGestioneClientiTable = ({ clienti }) => {
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
                            <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                        </ModalLink>

                        <ModalLink
                            id="delete-btn"
                            href={`/operatore/gestione-clienti/eliminazione/${row.IDcliente}`}
                            title="Elimina cliente"
                        >
                            <FontAwesomeIcon icon={faSquareMinus} size="2xl" />
                        </ModalLink>
                    </div>
                ),
            },
        ],
        []
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
