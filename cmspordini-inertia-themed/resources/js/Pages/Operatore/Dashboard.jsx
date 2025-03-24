import React from "react";
import Notification from "../../Components/Notification";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { Lavori } from "../../Components/Tables/Lavori";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { PaperContainer } from "../../Components/PaperContainer";
import { Button, Stack, Typography } from "@mui/material";
import {
    Loop as LoopIcon,
    NewReleases as NewReleasesIcon,
    CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const buttonStyles = {
    fontWeight: "bold",
    px: 3,
    py: 1,
    width: 170,
    textAlign: "left",
    gap: 1,
};

export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    const { handleLavori, loadingButton } = useDashboard();

    return (
        <PaperContainer>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {user?.nome
                    ? `Benvenuto ${user?.nome}`
                    : `Benvenuto ${user?.cognome ?? "Utente"}`}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                    startIcon={<NewReleasesIcon />}
                    size="large"
                    onClick={() => handleLavori("nuovi")}
                    variant="contained"
                    color="primary"
                    sx={buttonStyles}
                    disabled={tipo === "nuovi"}
                    loading={loadingButton === "nuovi"}
                >
                    Lavori nuovi
                </Button>
                <Button
                    startIcon={<LoopIcon />}
                    size="large"
                    onClick={() => handleLavori("inCorso")}
                    variant="contained"
                    color="primary"
                    sx={buttonStyles}
                    disabled={tipo === "inCorso"}
                    loading={loadingButton === "inCorso"}
                >
                    Lavori in corso
                </Button>
                <Button
                    startIcon={<CheckCircleIcon />}
                    size="large"
                    onClick={() => handleLavori("terminati")}
                    variant="contained"
                    color="primary"
                    sx={buttonStyles}
                    disabled={tipo === "terminati"}
                    loading={loadingButton === "terminati"}
                >
                    Lavori terminati
                </Button>
            </Stack>

            <Lavori lavori={lavori} tipoLavori={tipo} />
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
