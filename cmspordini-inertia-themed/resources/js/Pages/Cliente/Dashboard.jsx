import React from "react";
import { Link } from "@inertiajs/react";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Button, Typography } from "@mui/material";
import { ContentContainer } from "../../Components/ContentContainer";

export default function Dashboard({ user }) {
    return (
        <ContentContainer.Container>
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {user?.nome
                    ? `Benvenuto ${user?.nome}`
                    : `Benvenuto ${user?.cognome ?? "Utente"}`}
            </Typography>

            <Button
                size="large"
                component={Link}
                href="/cliente/ordini/creazione"
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold", px: 3, py: 1 }}
            >
                Crea ordine
            </Button>
        </ContentContainer.Container>
    );
}

Dashboard.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
