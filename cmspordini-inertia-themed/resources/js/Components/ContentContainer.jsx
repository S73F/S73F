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
                width: "100%",
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
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
