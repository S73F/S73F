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
    const { handleLavori, loadingButton } = useDashboard();

    return (
        <Content.Container>
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

            <LavoriTableContainer lavori={lavori} tipoLavori={tipo} />
        </Content.Container>
    );
}

Dashboard.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
