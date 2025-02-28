import React from "react";
import Table from "./Table";
import { ModalLink } from "@inertiaui/modal-react";

export default function GestioneClientiTable({
    clienti,
    openModal,
    handleDelete,
}) {
    return (
        <Table.Layout data={clienti}>
            <Table.Content>
                <Table.Head>
                    <th>Ragione Sociale</th>
                    <th>Nome</th>
                    <th>Cognome</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Azioni</th>
                </Table.Head>
                <Table.Body
                    data={clienti.data}
                    renderRow={(cliente) => (
                        <>
                            <td>
                                <ModalLink
                                    href={`/operatore/gestione-clienti/modifica/${cliente.IDcliente}`}
                                >
                                    {cliente.ragione_sociale}
                                </ModalLink>
                            </td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.cognome}</td>
                            <td>
                                <a href={`mailto:${cliente.emailcliente}`}>
                                    {cliente.emailcliente}
                                </a>
                            </td>
                            <td>{cliente.username}</td>
                            <td id="actions">
                                <ModalLink
                                    id="edit-btn"
                                    href={`/operatore/gestione-clienti/modifica/${cliente.IDcliente}`}
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
                        </>
                    )}
                ></Table.Body>
            </Table.Content>
        </Table.Layout>
    );
}
