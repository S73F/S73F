import React from "react";
import "../../../css/table.css";
import DataTable from "react-data-table-component";
import { useLavoriNuovi } from "../../Hooks/Components/Tables/useLavoriNuovi";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriNuovi = ({ lavori, handleFile, handleIncarico, loading }) => {
    const { columns, records, handleFilter } = useLavoriNuovi({
        lavori,
        handleFile,
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
                <h3 id="table-title">Lavori nuovi</h3>
                <SearchBox handleFilter={handleFilter} />
                <DataTable
                    className="custom-table"
                    columns={columns}
                    data={records}
                    expandableRows
                    expandableRowsComponent={LavoriExpanded}
                    expandOnRowClicked
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

export default LavoriNuovi;
