import React from "react";
import Layout from "../../Layouts/Layout";
import OrdiniClienteTable from "../../Components/Tables/OrdiniClienteTable";
import "../../../css/storicoOrdini.css";
import { useOrdiniClienti } from "../../Hooks/Operatore/useOrdiniClienti";

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
        </div>
    );
}

OrdiniClienti.layout = (page) => <Layout>{page}</Layout>;
