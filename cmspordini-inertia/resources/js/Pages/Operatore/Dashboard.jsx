import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/operatoreDashboard.css";
import { Link } from "@inertiajs/react";
import LavoriInCorso from "../../Components/Tables/LavoriInCorso";
import LavoriNuovi from "../../Components/Tables/LavoriNuovi";
import Notification from "../../Components/Notification";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";

export default function Dashboard({ user }) {
    const {
        tipoLavori,
        setTipoLavori,
        handleFile,
        handleFileFinale,
        handleIncarico,
        lavori,
        numeroLavoriNuovi,
        loading,
    } = useDashboard();

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
                            onClick={() => setTipoLavori("nuovi")}
                        >
                            Nuovi lavori
                        </button>
                        {!loading && numeroLavoriNuovi >= 0 && (
                            <Notification.Layout>
                                <Notification.LavoriNuovi
                                    lavoriNuovi={numeroLavoriNuovi}
                                    onClick={() => setTipoLavori("nuovi")}
                                ></Notification.LavoriNuovi>
                            </Notification.Layout>
                        )}
                        <button
                            className="btns-lavori"
                            id="btn-lavori-in-corso"
                            onClick={() => setTipoLavori("inCorso")}
                        >
                            Lavori in corso
                        </button>
                    </div>
                </div>

                {tipoLavori === "inCorso" && (
                    <LavoriInCorso
                        lavori={lavori}
                        handleFile={handleFile}
                        handleFileFinale={handleFileFinale}
                        handleIncarico={handleIncarico}
                        loading={loading}
                    />
                )}

                {tipoLavori === "nuovi" && (
                    <LavoriNuovi
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                        loading={loading}
                    />
                )}
            </div>
        </>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
