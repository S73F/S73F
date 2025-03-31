import React from "react";
import OrdiniClienteTable from "../../Components/Tables/OrdiniClienteTable";
import { useOrdiniClienti } from "../../Hooks/Operatore/useOrdiniClienti";
import { MenuItem, Typography } from "@mui/material";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { DataTable } from "../../Components/Tables/DataTable";

export default function OrdiniClienti({ clienti, ordini }) {
    const { handleChange } = useOrdiniClienti();

    return (
        <Content.Container>
            <Content.Layout title={"Ordini clienti"}>
                <DataTable.Selector
                    inputLabel={"Cliente"}
                    handleChange={handleChange}
                >
                    {clienti.map((cliente) => (
                        <MenuItem
                            key={cliente.IDcliente}
                            value={cliente.IDcliente}
                        >
                            {cliente.ragione_sociale}
                        </MenuItem>
                    ))}
                </DataTable.Selector>
            </Content.Layout>

            {ordini?.length > 0 && <OrdiniClienteTable ordini={ordini} />}
            {ordini?.length === 0 && (
                <Typography
                    variant="h5"
                    component={"p"}
                    sx={{ mt: 4, textAlign: "center" }}
                >
                    Nessun ordine trovato
                </Typography>
            )}
        </Content.Container>
    );
}

OrdiniClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
