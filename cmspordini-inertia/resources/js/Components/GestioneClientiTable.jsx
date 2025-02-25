import React, { useState } from "react";
import "../../css/gestioneClientiTable.css";
import "./Pagination";
import ModificaCliente from "./ModificaCliente";
import { router } from "@inertiajs/react";

export default function GestioneClientiTable({ clienti }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [cliente, setCliente] = useState({});

    const handleEdit = (cliente) => {
        setCliente(cliente);
        setIsEditModalOpen(true);
    };

    const handleDelete = (IDcliente) => {
        router.delete(`/operatore/gestione-clienti/cancellazione/${IDcliente}`);
    };

    return (
        <div id="gestione-clienti-table-container">
            <table id="gestione-clienti-table">
                <thead>
                    <tr>
                        <th>Ragione Sociale</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {clienti.map((cliente) => (
                        <tr key={cliente.IDcliente}>
                            <td>
                                <a onClick={handleEdit}>
                                    {cliente.ragione_sociale}
                                </a>
                            </td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cognome}</td>
                            <td>{cliente.emailcliente}</td>
                            <td>{cliente.username}</td>
                            <td id="actions">
                                <button
                                    id="edit-btn"
                                    onClick={() => handleEdit(cliente)}
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
                                </button>

                                <button
                                    id="delete-btn"
                                    onClick={() =>
                                        handleDelete(cliente.IDcliente)
                                    }
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <ModificaCliente
                    cliente={cliente}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}
