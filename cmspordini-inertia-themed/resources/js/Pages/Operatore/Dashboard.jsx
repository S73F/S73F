import React from "react";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { LavoriTableContainer } from "../../Components/Tables/LavoriTableContainer";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { Badge, Button, Stack, Typography } from "@mui/material";
import {
    Loop as LoopIcon,
    NewReleases as NewReleasesIcon,
    Mail as MailIcon,
} from "@mui/icons-material";
import { buttonStyles, badgeStyle } from "../../styles/appStyles";

export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    // Custom hook per gestire il cambio dello stato dei lavori e stato di caricamento
    const { handleLavori, loadingButton } = useDashboard();

    return (
        <Content.Container>
            {/* Messaggio di benvenuto personalizzato in base ai dati dell'utente */}
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {/* Se il nome è disponibile, usa quello, altrimenti usa il cognome o un valore predefinito */}
                {user?.nome
                    ? `Benvenuto ${user?.nome}`
                    : `Benvenuto ${user?.cognome ?? "Utente"}`}
            </Typography>

            {/* Stack con i pulsanti per filtrare i lavori */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 2, lg: 3 }}
                justifyContent="center"
            >
                {/* Pulsante per i nuovi lavori con Badge per il numero di nuovi lavori */}
                <Badge
                    badgeContent={numLavoriNuovi} // Mostra il numero di nuovi lavori
                    color="primary"
                    showZero={false} // Nasconde il badge se il numero è 0
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    max={99} // Limita il conteggio del badge a 99
                    sx={badgeStyle}
                >
                    <Button
                        startIcon={<NewReleasesIcon />} // Icona per i nuovi lavori
                        size="large"
                        onClick={() => handleLavori("nuovi")} // Cambia lo stato dei lavori a "nuovi"
                        variant="contained"
                        color="primary"
                        sx={buttonStyles}
                        disabled={tipo === "nuovi"} // Disabilita il pulsante se il tipo di lavori è "nuovi (dunque,se è già attivo)"
                        loading={loadingButton === "nuovi"} // Mostra il loading se è in caricamento
                    >
                        Lavori nuovi
                    </Button>
                </Badge>

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
                    startIcon={<MailIcon />}
                    size="large"
                    onClick={() => handleLavori("spediti")}
                    variant="contained"
                    color="primary"
                    sx={buttonStyles}
                    disabled={tipo === "spediti"}
                    loading={loadingButton === "spediti"}
                >
                    Lavori spediti
                </Button>
            </Stack>

            {/* Contenitore per la tabella dei lavori filtrati */}
            <LavoriTableContainer lavori={lavori} tipoLavori={tipo} />
        </Content.Container>
    );
}

// Assegna il layout specifico per la dashboard dell'operatore
Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
