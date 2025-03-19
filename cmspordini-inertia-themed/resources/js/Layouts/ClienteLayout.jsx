import { Link, usePage } from "@inertiajs/react";
import React from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Layout from "./Layout";
import { History as HistoryIcon, Home as HomeIcon } from "@mui/icons-material";

export default function ClienteLayout({ children }) {
    const ListItems = (
        <ListItem disablePadding>
            <ListItemButton component={Link} href="/cliente/ordini/storico">
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Storico ordini" />
            </ListItemButton>
        </ListItem>
    );

    return <Layout ListItems={ListItems}>{children}</Layout>;
}
