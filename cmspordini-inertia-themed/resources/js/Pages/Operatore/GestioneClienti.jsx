import React from "react";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { ContentContainer } from "../../Components/ContentContainer";
import { Typography } from "@mui/material";

export default function GestioneClienti({ clienti }) {
    return (
        <ContentContainer.Container>
            <ContentContainer.Layout title={"Gestione clienti"} />

            {clienti?.length > 0 && <GestioneClientiTable clienti={clienti} />}
            {clienti?.length === 0 && (
                <Typography
                    variant="h5"
                    component={"p"}
                    sx={{ mt: 4, textAlign: "center" }}
                >
                    Nessun cliente trovato
                </Typography>
            )}
        </ContentContainer.Container>
    );
}

GestioneClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
