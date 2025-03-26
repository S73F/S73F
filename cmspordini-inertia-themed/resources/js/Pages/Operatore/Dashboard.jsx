import React from "react";
import { useDashboard } from "../../Hooks/Operatore/useDashboard";
import { Lavori } from "../../Components/Tables/Lavori";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { ContentContainer } from "../../Components/ContentContainer";
import { Badge, Button, Stack, Typography } from "@mui/material";
import {
    Loop as LoopIcon,
    NewReleases as NewReleasesIcon,
    Mail as MailIcon,
} from "@mui/icons-material";
import { badgeStyle, buttonStyles } from "../../styles/styles";

export default function Dashboard({ user, tipo, lavori, numLavoriNuovi }) {
    const { handleLavori, loadingButton } = useDashboard();

    return (
        <ContentContainer.Container>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {user?.nome
                    ? `Benvenuto ${user?.nome}`
                    : `Benvenuto ${user?.cognome ?? "Utente"}`}
            </Typography>

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 2, lg: 3 }}
                justifyContent="center"
            >
                <Badge
                    badgeContent={numLavoriNuovi}
                    color="primary"
                    showZero={false}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    max={99}
                    sx={badgeStyle}
                >
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

            <Lavori lavori={lavori} tipoLavori={tipo} />
        </ContentContainer.Container>
    );
}

Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
