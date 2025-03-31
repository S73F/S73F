import React from "react";
import StoricoOrdiniTable from "../../Components/Tables/StoricoOrdiniTable";
import { useStoricoOrdini } from "../../Hooks/Cliente/useStoricoOrdini";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { MenuItem, Typography } from "@mui/material";
import { Content } from "../../Components/Content";
import { DataTable } from "../../Components/Tables/DataTable";

export default function StoricoOrdini({ ordini }) {
    // Custom hook per gestire il cambiamento del filtro temporale
    const { handleChange } = useStoricoOrdini();

    return (
        <Content.Container>
            <Content.Layout title={"Storico ordini"}>
                {/* Selettore per filtrare gli ordini in base al lasso di tempo */}
                <DataTable.Selector
                    inputLabel={"Lasso di tempo"}
                    handleChange={handleChange}
                >
                    <MenuItem value={30}>30 giorni</MenuItem>
                    <MenuItem value={60}>60 giorni</MenuItem>
                    <MenuItem value={"tutto"}>Tutto</MenuItem>
                </DataTable.Selector>
            </Content.Layout>

            {/* Mostra la tabella solo se ci sono ordini disponibili */}
            {ordini?.length > 0 && <StoricoOrdiniTable ordini={ordini} />}

            {/* Messaggio di fallback nel caso non ci siano ordini */}
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
