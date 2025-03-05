import React from "react";
import { useLavoriInCorso } from "../../Hooks/Components/Tables/useLavoriInCorso";
import DataTable from "react-data-table-component";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriInCorso = ({ handleFile, handleFileFinale }) => {
    const { loading, lavori, columns, handleFilter } = useLavoriInCorso({
        handleFile,
        handleFileFinale,
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
                    data={lavori}
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
