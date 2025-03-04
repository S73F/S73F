import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import { useOrdiniClientiTable } from "../../Hooks/Components/Tables/useOrdiniClienteTable";
import { SearchBox } from "./SearchBox";

export default function OrdiniClienteTable({ ordini }) {
    const { records, columns, handleFilter } = useOrdiniClientiTable({
        ordini,
    });

    return (
        <>
            <SearchBox handleFilter={handleFilter} />
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
