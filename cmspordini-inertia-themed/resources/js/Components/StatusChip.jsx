import React from "react";
import { Circle } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { chipColors, chipStyle, circleStyles } from "../styles/styles";

const Nuovo = () => {
    return (
        <Chip
            label="Nuovo"
            icon={<Circle sx={circleStyles.nuovo} />}
            sx={{
                ...chipStyle,
                ...chipColors.nuovo,
            }}
        />
    );
};

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

export const StatusChip = {
    Nuovo,
    InCorso,
    Spedito,
};
