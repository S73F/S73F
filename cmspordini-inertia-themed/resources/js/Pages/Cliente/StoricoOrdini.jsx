import React from "react";
import StoricoOrdiniTable from "../../Components/Tables/StoricoOrdiniTable";
import { useStoricoOrdini } from "../../Hooks/Cliente/useStoricoOrdini";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { MenuItem, Typography } from "@mui/material";
import { Content } from "../../Components/Content";
import { DataTable } from "../../Components/Tables/DataTable";

export default function StoricoOrdini({ ordini }) {
    const { handleChange } = useStoricoOrdini();

    return (
        <Content.Container>
            <Content.Layout title={"Storico ordini"}>
                <DataTable.Selector
                    inputLabel={"Lasso di tempo"}
                    handleChange={handleChange}
                >
                    <MenuItem value={30}>30 giorni</MenuItem>
                    <MenuItem value={60}>60 giorni</MenuItem>
                    <MenuItem value={"tutto"}>Tutto</MenuItem>
                </DataTable.Selector>
            </Content.Layout>

            {ordini?.length > 0 && <StoricoOrdiniTable ordini={ordini} />}
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

StoricoOrdini.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
