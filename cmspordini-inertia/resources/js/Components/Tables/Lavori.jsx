import React from "react";
import LavoriInCorso from "./LavoriInCorso";
import LavoriNuovi from "./LavoriNuovi";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

export const Lavori = ({ tipoLavori, setNumeroLavoriNuovi }) => {
    const { lavori, handleFile, handleFileFinale, handleIncarico, loading } =
        useLavori({ tipoLavori, setNumeroLavoriNuovi });

    return (
        <>
            {tipoLavori === "inCorso" && (
                <LavoriInCorso
                    lavori={lavori}
                    handleFile={handleFile}
                    handleFileFinale={handleFileFinale}
                    handleIncarico={handleIncarico}
                    loading={loading}
                />
            )}

            {tipoLavori === "nuovi" && (
                <LavoriNuovi
                    lavori={lavori}
                    handleFile={handleFile}
                    handleIncarico={handleIncarico}
                    loading={loading}
                />
            )}
        </>
    );
};
