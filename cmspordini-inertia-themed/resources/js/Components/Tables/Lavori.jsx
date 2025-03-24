import React from "react";
import LavoriInCorso from "./LavoriInCorso";
import LavoriNuovi from "./LavoriNuovi";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";
import { Box, Typography } from "@mui/material";
import LavoriSpediti from "./LavoriSpediti";

const iconStyle = {
    color: "inherit",
    "&:hover": { color: "#1976d2" },
    mr: 0.5,
};

export const Lavori = ({ tipoLavori, lavori }) => {
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
                    <LavoriNuovi
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                        iconStyle={iconStyle}
                    />
                )}

                {tipoLavori === "inCorso" && (
                    <LavoriInCorso
                        lavori={lavori}
                        handleFile={handleFile}
                        handleIncarico={handleIncarico}
                        iconStyle={iconStyle}
                    />
                )}

                {tipoLavori === "spediti" && (
                    <LavoriSpediti
                        lavori={lavori}
                        handleFile={handleFile}
                        iconStyle={iconStyle}
                    />
                )}
            </Box>
        );
    }
};
