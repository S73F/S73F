import React, { useMemo } from "react";
import "../../../css/tableStyles.css";
import DataTable from "react-data-table-component";
import { useLavoriNuovi } from "../../Hooks/Components/Tables/useLavoriNuovi";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriNuovi = ({ lavori, handleFile, handleIncarico }) => {
    const { records, columns, handleFilter } = useLavoriNuovi({
        lavori,
        handleFile,
        handleIncarico,
    });

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
};

export default LavoriNuovi;
