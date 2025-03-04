import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

export default function LavoriInCorsoExpanded({ data }) {
    const columns = useMemo(
        () => [
            {
                name: "Email richiedente",
                selector: (row) => (
                    <a href={`mailto:${row.cliente.emailcliente}`}>
                        {row.cliente.emailcliente}
                    </a>
                ),
            },
            {
                name: "Data ordine",
                selector: (row) => row.data,
            },
        ],
        []
    );

    return (
        <DataTable
            className="custom-table"
            columns={columns}
            data={[data]}
        ></DataTable>
    );
}
