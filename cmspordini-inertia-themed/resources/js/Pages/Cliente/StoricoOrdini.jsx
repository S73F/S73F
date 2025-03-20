import React from "react";
import StoricoOrdiniTable from "../../Components/Tables/StoricoOrdiniTable";
import { useStoricoOrdini } from "../../Hooks/Cliente/useStoricoOrdini";
import ClienteLayout from "../../Layouts/ClienteLayout";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { PaperContainer } from "../../Components/PaperContainer";

export default function StoricoOrdini({ ordini }) {
    const { handleChange } = useStoricoOrdini();

    return (
        <PaperContainer>
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 4, textAlign: "center" }}
            >
                Storico ordini
            </Typography>

            <FormControl sx={{ width: "80%", mb: 4 }}>
                <InputLabel id="storico-ordini-selector-label">
                    Lasso di tempo
                </InputLabel>
                <Select
                    labelId="storico-ordini-selector-label"
                    id="storico-ordini-selector"
                    defaultValue=""
                    label="Lasso di tempo"
                    onChange={handleChange}
                >
                    <MenuItem value={30}>30 giorni</MenuItem>
                    <MenuItem value={60}>60 giorni</MenuItem>
                    <MenuItem value={"tutto"}>Tutto</MenuItem>
                </Select>
            </FormControl>

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
        </PaperContainer>
    );
}

StoricoOrdini.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
