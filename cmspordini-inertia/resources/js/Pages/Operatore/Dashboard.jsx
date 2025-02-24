import React, { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/operatoreDashboard.css";
import { Link } from "@inertiajs/react";
import LavoriInCorso from "../../Components/LavoriInCorso";
import LavoriNuovi from "../../Components/LavoriNuovi";

export default function Dashboard({ user, lavoriInCorso, lavoriNuovi }) {
    const [tipoLavori, setTipoLavori] = useState("inCorso");

    return (
        <div id="dashboard-container-operatore">
            <div id="main-container-operatore">
                <h2>Benvenuto {user.nome}</h2>

                <div id="btns-container">
                    <Link href="/operatore/gestione-clienti">
                        Gestione clienti
                    </Link>
                    <Link href="">Ordini</Link>
                    <button
                        id="btn-nuovi-lavori"
                        onClick={() => setTipoLavori("nuovi")}
                    >
                        Nuovi lavori
                    </button>
                    <button
                        id="btn-lavori-in-corso"
                        onClick={() => setTipoLavori("inCorso")}
                    >
                        Lavori in corso
                    </button>
                </div>
            </div>

            {tipoLavori === "inCorso" && (
                <LavoriInCorso lavori={lavoriInCorso} />
            )}

            {tipoLavori === "nuovi" && <LavoriNuovi lavori={lavoriNuovi} />}
        </div>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
