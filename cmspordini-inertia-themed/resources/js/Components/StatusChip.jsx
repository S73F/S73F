import React from "react";
import { Circle } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { chipColors, chipStyle, circleStyles } from "../styles/tableStyles";

/**
 * Componente che visualizza un chip con il label "Nuovo" e un'icona di cerchio.
 *
 * @returns {JSX.Element} - Un chip con il label "Nuovo" e l'icona corrispondente.
 */
const Nuovo = () => {
    return (
        <Chip
            label="Nuovo"
            icon={<Circle sx={circleStyles.nuovo} />}
            sx={{
                ...chipStyle, // Applica gli stili di base del chip.
                ...chipColors.nuovo, // Applica il colore specifico per "Nuovo".
            }}
        />
    );
};

/**
 * Componente che visualizza un chip con il label "In corso" e un'icona di cerchio.
 *
 * @returns {JSX.Element} - Un chip con il label "In corso" e l'icona corrispondente.
 */
const InCorso = () => {
    return (
        <Chip
            label="In corso"
            icon={<Circle sx={circleStyles.inCorso} />}
            sx={{
                ...chipStyle,
                ...chipColors.inCorso,
            }}
        />
    );
};

/**
 * Componente che visualizza un chip con il label "Spedito" e un'icona di cerchio.
 *
 * @returns {JSX.Element} - Un chip con il label "Spedito" e l'icona corrispondente.
 */
const Spedito = () => {
    return (
        <Chip
            label="Spedito"
            icon={<Circle sx={circleStyles.spedito} />}
            sx={{
                ...chipStyle,
                ...chipColors.spedito,
            }}
        />
    );
};

// Esporta i componenti Nuovo, InCorso, e Spedito come un oggetto,
// in modo che possano essere utilizzati da altre parti dell'app.
export const StatusChip = {
    Nuovo,
    InCorso,
    Spedito,
};
