import React from "react";
import { Link } from "@inertiajs/react";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PaperContainer } from "../../Components/PaperContainer";

export default function Dashboard({ user }) {
    return (
        <PaperContainer>
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
        </PaperContainer>
    );
}

Dashboard.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
