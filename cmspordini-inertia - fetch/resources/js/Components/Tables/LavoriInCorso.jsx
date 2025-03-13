import React from "react";
import "../../../css/table.css";
import { useLavoriInCorso } from "../../Hooks/Components/Tables/useLavoriInCorso";
import DataTable from "react-data-table-component";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriInCorso = ({
    lavori,
    handleFile,
    handleFileFinale,
    handleIncarico,
    loading,
}) => {
    const { columns, records, handleFilter } = useLavoriInCorso({
        lavori,
        handleFile,
        handleFileFinale,
        handleIncarico,
    });

    if (loading) {
        return (
            <div id="loading-spinner">
                <div id="spinner"></div>
            </div>
        );
    }

    if (!loading && lavori) {
        return (
            <>
                <h3 id="table-title">Lavori in corso</h3>
                <SearchBox handleFilter={handleFilter} />
                <DataTable
                    className="custom-table"
                    columns={columns}
                    data={records}
                    expandableRows
                    expandOnRowClicked
                    expandableRowsComponent={LavoriExpanded}
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
};

export default LavoriInCorso;
