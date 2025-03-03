import React from "react";
import "../../../css/storicoOrdini.css";
import Layout from "../../Layouts/Layout";
import StoricoOrdiniTable from "../../Components/Tables/StoricoOrdiniTable";
import { useStoricoOrdini } from "../../Hooks/Cliente/useStoricoOrdini";

export default function StoricoOrdini({ ordini }) {
    const { handleChange } = useStoricoOrdini();

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

            {ordini?.length > 0 && <StoricoOrdiniTable ordini={ordini} />}
            {/* {ordini?.data.length > 0 && <StoricoOrdiniTable ordini={ordini} />} */}
        </div>
    );
}

StoricoOrdini.layout = (page) => <Layout>{page}</Layout>;
