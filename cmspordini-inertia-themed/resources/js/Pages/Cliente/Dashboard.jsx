import React from "react";
import { Link } from "@inertiajs/react";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function Dashboard({ user }) {
    return (
        <Paper
            elevation={5}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minWidth: "90%",
                minHeight: { xs: `calc(65vh - 48px)`, sm: `calc(75vh - 64px)` },
                p: 4,
            }}
        >
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
        </Paper>
    );
}

Dashboard.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
