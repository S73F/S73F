import React from "react";
import LavoriNuoviTable from "./LavoriNuoviTable";
import LavoriInCorsoTable from "./LavoriInCorsoTable";
import LavoriSpeditiTable from "./LavoriSpeditiTable";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Box, Typography } from "@mui/material";

export const LavoriTableContainer = ({ tipoLavori, lavori }) => {
    const { handleFile, handleIncarico } = useLavori();

    if (lavori?.length === 0) {
        return (
            <Typography
                variant="h5"
                component={"p"}
                sx={{ mt: 4, textAlign: "center" }}
            >
                Nessun lavoro trovato
            </Typography>
        );
    } else {
        return (
            <Box mt={8} width={"100%"}>
                {tipoLavori === "nuovi" && (
                    <LavoriNuoviTable
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                    />
                )}

                {tipoLavori === "inCorso" && (
                    <LavoriInCorsoTable
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                    />
                )}

                {tipoLavori === "spediti" && (
                    <LavoriSpeditiTable
                        lavori={lavori}
                        handleFile={handleFile}
                    />
                )}
            </Box>
        );
    }
};
