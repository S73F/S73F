import { Paper, Typography } from "@mui/material";
import React from "react";

const Layout = ({ title, children }) => {
    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 4, textAlign: "center" }}
            >
                {title}
            </Typography>
            {children}
        </>
    );
};

const Container = ({ children }) => {
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

export const ContentContainer = {
    Layout,
    Container,
};
