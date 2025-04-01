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

/**
 * Componente per la dashboard dell'operatore.
 * Mostra una lista di lavori filtrati in base al tipo (nuovi, in corso, spediti).
 * Include pulsanti per cambiare il filtro e una tabella per visualizzare i lavori filtrati.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Object} props.user - Dati dell'utente, utilizzati per visualizzare un messaggio di benvenuto personalizzato.
 * @param {string} props.tipo - Tipo di lavori da visualizzare ("nuovi", "inCorso", "spediti").
 * @param {Array} props.lavori - Lista di lavori da visualizzare nella tabella.
 * @param {number} props.numLavoriNuovi - Numero di nuovi lavori da visualizzare nel badge.
 * @returns {JSX.Element} La UI della dashboard con la possibilità di filtrare i lavori.
 */
export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    const { handleLavori, loadingButton } = useDashboard(); // Custom hook per gestire il cambio del tipo dei lavori e il loro stato di caricamento

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

/**
 * Imposta il layout specifico per la dashboard dell'operatore, utilizzando il layout OperatoreLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout OperatoreLayout.
 */
Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
