import React, { useEffect, useState } from "react";
import "../../../css/storicoOrdini.css";
import Layout from "../../Layouts/Layout";
import StoricoOrdiniTable from "../../Components/StoricoOrdiniTable";

export default function StoricoOrdini() {
    const [tempo, setTempo] = useState(null);
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        const tempo = e.target.value;
        setTempo(tempo);
    };

    useEffect(() => {
        if (tempo) {
            fetch(`/cliente/ordini/storico/tempo?q=${tempo}`)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                });
        }
    }, [tempo]);

    return (
        <div id="orders-history">
            <h2 id="orders-history-title">Storico ordini</h2>

            <select
                id="selector"
                name="tempo"
                onChange={handleChange}
                defaultValue=""
            >
                <option disabled value="">
                    Lasso di tempo
                </option>
                <option className="select-element" value="30">
                    30 giorni
                </option>
                <option className="select-element" value="60">
                    60 giorni
                </option>
                <option disabled>---</option>
                <option className="select-element" value="tutto">
                    Tutto
                </option>
            </select>

            {data && <StoricoOrdiniTable ordini={data} />}
        </div>
    );
}

StoricoOrdini.layout = (page) => <Layout>{page}</Layout>;
