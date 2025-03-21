import React from "react";
import "../../../css/operatoreDashboard.css";
import { Link } from "@inertiajs/react";
import Notification from "../../Components/Notification";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { Lavori } from "../../Components/Tables/Lavori";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { PaperContainer } from "../../Components/PaperContainer";
import { Typography } from "@mui/material";

export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    const { handleLavori } = useDashboard();

    return (
        <PaperContainer>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {user?.nome
                    ? `Benvenuto ${user?.nome}`
                    : `Benvenuto ${user?.cognome ?? "Utente"}`}
            </Typography>
        </PaperContainer>
    );

    // return (
    //     <>
    //         <div id="dashboard-container-operatore">
    //             <div id="main-container-operatore">
    //                 {user?.nome ? (
    //                     <h2>Benvenuto {user?.nome}</h2>
    //                 ) : (
    //                     <h2>Benvenuto {user?.cognome ?? "Utente"}</h2>
    //                 )}

    //                 <div id="btns-container">
    //                     <Link href="/operatore/gestione-clienti">
    //                         Gestione clienti
    //                     </Link>
    //                     <Link href="/operatore/ordini-clienti">Ordini</Link>
    //                     <button
    //                         className="btns-lavori"
    //                         id="btn-nuovi-lavori"
    //                         onClick={() => handleLavori("nuovi")}
    //                     >
    //                         Nuovi lavori
    //                     </button>
    //                     <Notification.Layout>
    //                         <Notification.LavoriNuovi
    //                             lavoriNuovi={numLavoriNuovi}
    //                             onClick={() => handleLavori("nuovi")}
    //                         ></Notification.LavoriNuovi>
    //                     </Notification.Layout>
    //                     <button
    //                         className="btns-lavori"
    //                         id="btn-lavori-in-corso"
    //                         onClick={() => handleLavori("inCorso")}
    //                     >
    //                         Lavori in corso
    //                     </button>
    //                 </div>
    //             </div>

    //             <div id="dashboard-table-container">
    //                 <Lavori lavori={lavori} tipoLavori={tipo} />
    //             </div>
    //         </div>
    //     </>
    // );
}

Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
