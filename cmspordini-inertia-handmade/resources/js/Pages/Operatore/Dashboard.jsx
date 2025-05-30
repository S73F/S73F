import React from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/operatoreDashboard.css";
import { Link } from "@inertiajs/react";
import LavoriInCorso from "../../Components/Tables/LavoriInCorso";
import LavoriNuovi from "../../Components/Tables/LavoriNuovi";
import Notification from "../../Components/Notification";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { useModal } from "../../Hooks/Components/Modals/useModal";
import { Lavorazione } from "../../Components/Modals/Lavorazione";

export default function Dashboard({ user, lavoriInCorso, lavoriNuovi }) {
    const { tipoLavori, setTipoLavori, handleFile, handleIncarico } =
        useDashboard();
    const { modal, openModal, closeModal } = useModal();

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
                        <Notification.Layout>
                            <Notification.LavoriNuovi
                                lavoriNuovi={lavoriNuovi}
                                onClick={() => setTipoLavori("nuovi")}
                            ></Notification.LavoriNuovi>
                        </Notification.Layout>
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
                        lavori={lavoriInCorso}
                        handleFile={handleFile}
                        openModal={openModal}
                    />
                )}

                {tipoLavori === "nuovi" && (
                    <LavoriNuovi
                        lavori={lavoriNuovi}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                    />
                )}
            </div>

            {modal.type === "caricamentoLavorazione" && (
                <Lavorazione
                    onClose={() => closeModal()}
                    ordine={modal.param}
                ></Lavorazione>
            )}
        </>
    );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
