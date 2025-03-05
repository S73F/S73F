import React, { useMemo } from "react";
import "../../../css/tableStyles.css";
import DataTable from "react-data-table-component";
import { useLavoriNuovi } from "../../Hooks/Components/Tables/useLavoriNuovi";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriNuovi = ({ handleFile }) => {
    const { loading, lavori, columns, handleFilter } = useLavoriNuovi({
        handleFile,
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
                    data={lavori}
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
