import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/operatoreDashboard.css";
import { Link } from "@inertiajs/react";
import Notification from "../../Components/Notification";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { Lavori } from "../../Components/Tables/Lavori";

export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    const { handleLavori } = useDashboard();

    return (
        <>
            <div id="dashboard-container-operatore">
                <div id="main-container-operatore">
                    <h2>Benvenuto {user.nome}</h2>

                    <div id="btns-container">
                        <Link href="/operatore/gestione-clienti">
                            Gestione clienti
                        </Link>
                        <Link href="/operatore/ordini-clienti">Ordini</Link>
                        <button
                            className="btns-lavori"
                            id="btn-nuovi-lavori"
                            onClick={() => handleLavori("nuovi")}
                        >
                            Nuovi lavori
                        </button>
                        <Notification.Layout>
                            <Notification.LavoriNuovi
                                lavoriNuovi={numLavoriNuovi}
                                onClick={() => handleLavori("nuovi")}
                            ></Notification.LavoriNuovi>
                        </Notification.Layout>
                        <button
                            className="btns-lavori"
                            id="btn-lavori-in-corso"
                            onClick={() => handleLavori("inCorso")}
                        >
                            Lavori in corso
                        </button>
                    </div>
                </div>

                <div id="dashboard-table-container">
                    <Lavori lavori={lavori} tipoLavori={tipo} />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
