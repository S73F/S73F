import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import OrdiniClienteTable from "../../Components/OrdiniClienteTable";

export default function Ordini({ clienti }) {
    const [data, setData] = useState(null);
    const [clienteID, setClienteID] = useState(null);

    const handleChange = (e) => {
        const IDcliente = e.target.value;
        setClienteID(IDcliente);
    };

    useEffect(() => {
        if (clienteID) {
            fetch(`/operatore/ordini-clienti/cliente?q=${clienteID}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                })
                .catch((error) => console.error("Errore nel fetch:", error));
        }
    }, [clienteID]);

    return (
        <div id="ordini-clienti-history">
            <h2 id="ordini-clienti-history-title">Storico ordini</h2>

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

            {data && <OrdiniClienteTable ordini={data} />}
        </div>
    );
}

Ordini.layout = (page) => <Layout>{page}</Layout>;
