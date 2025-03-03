import React, { useState } from "react";
import "../../../css/tableStyles.css";
import DataTable from "react-data-table-component";
import useStoricoOrdiniTable from "../../Hooks/Components/Tables/useStoricoOrdiniTable";
import StoricoOrdiniTableExpanded from "./StoricoOrdiniTableExpanded";

export default function StoricoOrdiniTable({ ordini }) {
    const { records, columns, handleFilter } = useStoricoOrdiniTable(ordini);

    return (
        <>
            <div id="search-box-container">
                <input
                    type="text"
                    placeholder="Ricerca"
                    onChange={handleFilter}
                />
            </div>
            <DataTable
                className="custom-table"
                columns={columns}
                data={records}
                expandableRows
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
