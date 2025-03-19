import React from "react";
import Layout from "../../Layouts/Layout";
import OrdiniClienteTable from "../../Components/Tables/OrdiniClienteTable";
import "../../../css/storicoOrdini.css";
import { useOrdiniClienti } from "../../Hooks/Operatore/useOrdiniClienti";
import { Typography } from "@mui/material";

export default function OrdiniClienti({ clienti, ordini }) {
    const { handleChange } = useOrdiniClienti();

    return (
        <div id="orders-history">
            <h2 id="orders-history-title">Storico ordini</h2>

            <select
                id="selector"
                name="cliente"
                onChange={handleChange}
                defaultValue=""
            >
                <option disabled value="">
                    Cliente
                </option>
                {clienti.map((cliente) => (
                    <option key={cliente.IDcliente} value={cliente.IDcliente}>
                        {cliente.ragione_sociale}
                    </option>
                ))}
            </select>

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
        </div>
    );
}

OrdiniClienti.layout = (page) => <Layout>{page}</Layout>;
