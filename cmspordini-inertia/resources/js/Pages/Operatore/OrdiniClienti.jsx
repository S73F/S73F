import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import OrdiniClienteTable from "../../Components/Tables/OrdiniClienteTable";

export default function OrdiniClienti({ clienti, ordini }) {
    const [clienteID, setClienteID] = useState(null);

    const handleChange = (e) => {
        setClienteID(e.target.value);
    };

    useEffect(() => {
        if (clienteID) {
            router.visit(`/operatore/ordini-clienti/${clienteID}`, {
                method: "get",
                preserveState: true,
            });
        }
    }, [clienteID]);

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

            {ordini?.data.length > 0 && <OrdiniClienteTable ordini={ordini} />}
        </div>
    );
}

OrdiniClienti.layout = (page) => <Layout>{page}</Layout>;
