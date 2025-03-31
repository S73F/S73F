import { Paper, Typography } from "@mui/material";
import React from "react";
import { contentContainer } from "../styles/appStyles";

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
        <Paper elevation={5} sx={contentContainer}>
            {children}
        </Paper>
    );
};

export const Content = {
    Layout,
    Container,
};
