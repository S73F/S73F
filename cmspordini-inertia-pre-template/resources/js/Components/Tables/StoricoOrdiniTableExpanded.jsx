import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

export default function StoricoOrdiniTableExpanded({ data }) {
    const columns = useMemo(
        () => [
            {
                name: "Nome paziente",
                selector: (row) => row.PazienteNome,
            },
            {
                name: "Cognome paziente",
                selector: (row) => row.PazienteCognome,
            },
            {
                name: "Indirizzo",
                selector: (row) => row.IndirizzoSpedizione,
            },
        ],
        []
    );

    console.log(data);

    return (
        <DataTable
            className="custom-table"
            columns={columns}
            data={[data]}
        ></DataTable>
    );
}
