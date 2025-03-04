import React from "react";
import { useLavoriInCorso } from "../../Hooks/Components/Tables/useLavoriInCorso";
import DataTable from "react-data-table-component";
import { SearchBox } from "./SearchBox";
import LavoriExpanded from "./LavoriExpanded";

const LavoriInCorso = ({
    lavori,
    handleFile,
    handleIncarico,
    handleFileFinale,
}) => {
    const { records, columns, handleFilter } = useLavoriInCorso({
        lavori,
        handleFile,
        handleIncarico,
        handleFileFinale,
    });

    return (
        <>
            <h3>Lavori in corso</h3>
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
};

export default LavoriInCorso;
