import React from "react";
import { Link } from "@inertiajs/react";
import ClienteLayout from "../../Layouts/ClienteLayout";
import { Button, Typography } from "@mui/material";
import { Content } from "../../Components/Content";

export default function Dashboard({ user }) {
    return (
        <Content.Container>
            {/* Messaggio di benvenuto personalizzato in base ai dati dell'utente */}
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
                {/* Se il nome è disponibile, usa quello, altrimenti usa il cognome o un valore predefinito */}
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
        </Content.Container>
    );
}

// Imposta il layout specifico per la dashboard del cliente
Dashboard.layout = (page) => <ClienteLayout>{page}</ClienteLayout>;
