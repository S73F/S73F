import { Link, usePage } from "@inertiajs/react";
import React from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Layout from "./Layout";
import {
    History as HistoryIcon,
    Person as PersonIcon,
} from "@mui/icons-material";

export default function OperatoreLayout({ children }) {
    const ListItems = (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/operatore/ordini-clienti"
                >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ordini clienti" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/operatore/gestione-clienti"
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestione clienti" />
                </ListItemButton>
            </ListItem>
        </>
    );

    return <Layout ListItems={ListItems}>{children}</Layout>;
}
