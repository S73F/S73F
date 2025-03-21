import React from "react";
import LavoriInCorso from "./LavoriInCorso";
import LavoriNuovi from "./LavoriNuovi";
import { useLavori } from "../../Hooks/Components/Tables/useLavori";

export const Lavori = ({ tipoLavori, lavori }) => {
    const { handleFile, handleIncarico } = useLavori();

    return (
        <>
            {tipoLavori === "inCorso" && (
                <LavoriInCorso
                    lavori={lavori}
                    handleFile={handleFile}
                    handleIncarico={handleIncarico}
                />
            )}

            {tipoLavori === "nuovi" && (
                <LavoriNuovi
                    lavori={lavori}
                    handleFile={handleFile}
                    handleIncarico={handleIncarico}
                />
            )}
        </>
    );
};
