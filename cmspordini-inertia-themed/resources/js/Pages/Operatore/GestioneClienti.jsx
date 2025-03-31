import React from "react";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { Typography } from "@mui/material";

export default function GestioneClienti({ clienti }) {
    return (
        <Content.Container>
            <Content.Layout title={"Gestione clienti"} />

            {/* Mostra la tabella solo se sono presenti clienti nel database */}
            {clienti?.length > 0 && <GestioneClientiTable clienti={clienti} />}

            {/* Messaggio di fallback nel caso non ci siano clienti */}
            {clienti?.length === 0 && (
                <Typography
                    variant="h5"
                    component={"p"}
                    sx={{ mt: 4, textAlign: "center" }}
                >
                    Nessun cliente trovato
                </Typography>
            )}
        </Content.Container>
    );
}

GestioneClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
