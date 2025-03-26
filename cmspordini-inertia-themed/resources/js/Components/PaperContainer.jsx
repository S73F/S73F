import { Paper } from "@mui/material";
import React from "react";

export const PaperContainer = ({ children }) => {
    return (
        <Paper
            elevation={5}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                minHeight: {
                    xs: `calc(90vh - 56px)`,
                    sm: `calc(90vh - 64px)`,
                },
                px: 4,
                py: 6,
            }}
        >
            {children}
        </Paper>
    );
};
