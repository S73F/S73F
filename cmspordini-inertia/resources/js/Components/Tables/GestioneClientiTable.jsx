import React from "react";
import { useGestioneClientiTable } from "../../Hooks/Components/Tables/useGestioneClientiTable";
import { SearchBox } from "./SearchBox";
import DataTable from "react-data-table-component";
import { ModalLink } from "@inertiaui/modal-react";

export default function GestioneClientiTable({ clienti }) {
    const { records, columns, handleFilter } = useGestioneClientiTable({
        clienti,
    });

    return (
        <>
            <div id="gestione-clienti-interactions">
                <SearchBox handleFilter={handleFilter} />
                <ModalLink
                    id="add-cliente"
                    href={"/operatore/gestione-clienti/creazione"}
                    title="Aggiungi cliente"
                >
                    +
                </ModalLink>
            </div>
            <DataTable
                className="custom-table"
                columns={columns}
                data={records}
                pagination
                paginationComponentOptions={{
                    rowsPerPageText: "Righe per pagina",
                    rangeSeparatorText: "di",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Tutte",
                }}
            />
        </>
    );
}
