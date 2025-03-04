import React from "react";
import Table from "./Table";
import { ModalLink } from "@inertiaui/modal-react";
import { useLavoriInCorso } from "../../Hooks/Components/Tables/useLavoriInCorso";
import DataTable from "react-data-table-component";
import { SearchBox } from "./SearchBox";
import LavoriInCorsoExpanded from "./LavoriInCorsoExpanded";

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
                expandableRowsComponent={LavoriInCorsoExpanded}
                pagination
                paginationComponentOptions={{
                    rowsPerPageText: "Righe per pagina",
                    rangeSeparatorText: "di",
                    selectAllRowsItem: true,
                    selectAllRowsItemText: "Tutte",
                }}
                fixedHeader
            />
        </>
    );
};

export default LavoriInCorso;
