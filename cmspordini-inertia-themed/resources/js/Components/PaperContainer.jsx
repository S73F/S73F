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
                minWidth: "100%",
                maxWidth: "65vh",
                minHeight: {
                    xs: `calc(90vh - 48px)`,
                    sm: `calc(90vh - 64px)`,
                },
                p: 4,
            }}
        >
            {children}
        </Paper>
    );
};
