import React from "react";
import "../../../css/table.css";
import DataTable from "react-data-table-component";
import useStoricoOrdiniTable from "../../Hooks/Components/Tables/useStoricoOrdiniTable";
import StoricoOrdiniTableExpanded from "./StoricoOrdiniTableExpanded";
import { SearchBox } from "./SearchBox";

export default function StoricoOrdiniTable({ ordini }) {
    const { records, columns, handleFilter } = useStoricoOrdiniTable({
        ordini,
    });

    return (
        <>
            <SearchBox handleFilter={handleFilter} />
            <DataTable
                className="custom-table"
                columns={columns}
                data={records}
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={StoricoOrdiniTableExpanded}
                pagination
                paginationComponentOptions={{
                    rowsPerPageText: "Righe per pagina",
                    rangeSeparatorText: "di",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Tutte",
                }}
                fixedHeader
            ></DataTable>
        </>
    );
}
