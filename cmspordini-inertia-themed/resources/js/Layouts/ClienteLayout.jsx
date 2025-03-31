import { Link, usePage } from "@inertiajs/react";
import React, { useCallback, useState } from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Layout from "./Layout";
import { History as HistoryIcon } from "@mui/icons-material";
import { useLayout } from "../Hooks/Layouts/useLayout";

export default function ClienteLayout({ children }) {
    const { handleDrawerToggle, open } = useLayout();

    const ListItems = (
        <ListItem disablePadding>
            <ListItemButton
                onClick={handleDrawerToggle}
                component={Link}
                href="/cliente/ordini/storico"
            >
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Storico ordini" />
            </ListItemButton>
        </ListItem>
    );

    return (
        <Layout
            ListItems={ListItems}
            open={open}
            handleDrawerToggle={handleDrawerToggle}
        >
            {children}
        </Layout>
    );
}
