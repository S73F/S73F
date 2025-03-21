import React from "react";
import GestioneClientiTable from "../../Components/Tables/GestioneClientiTable";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { PaperContainer } from "../../Components/PaperContainer";
import { DataTable } from "../../Components/Tables/DataTable";

export default function GestioneClienti({ clienti }) {
    return (
        <PaperContainer>
            <DataTable.Layout title={"Gestione clienti"} />

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
        </PaperContainer>
    );
}

GestioneClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
