import { Link } from "@inertiajs/react";
import React, { useMemo } from "react";
import {
    Button,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Layout from "./Layout";
import { History as HistoryIcon } from "@mui/icons-material";
import { useLayout } from "../Hooks/Layouts/useLayout";

/**
 * Componente di layout per la pagina del cliente.
 *
 * Estende il layout principale (`Layout`) aggiungendo dei pulsanti specifici per il cliente.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout del cliente con il menu laterale e i pulsanti di navigazione.
 */
export default function ClienteLayout({ children }) {
    /**
     * Pulsanti da visualizzare nella barra di navigazione superiore.
     *
     * @constant
     * @type {React.ReactNode}
     */
    const Buttons = useMemo(
        () => (
            <>
                <Button
                    component={Link}
                    href="/cliente/ordini/storico"
                    title="Storico ordini"
                    sx={{ color: "#fff" }}
                >
                    Storico
                </Button>
            </>
        ),
        []
    );

    /**
     * Elementi del menu laterale (drawer).
     * Includono un collegamento alla pagina dello storico ordini.
     *
     * @constant
     * @type {React.ReactNode}
     */
    const ListItems = useMemo(
        () => (
            <ListItem disablePadding>
                <ListItemButton
                    component={Link}
                    href="/cliente/ordini/storico"
                    title="Storico ordini"
                >
                    {/* Icona che rappresenta lo storico ordini */}
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>

                    {/* Testo della voce di menu */}
                    <ListItemText primary="Storico ordini" />
                </ListItemButton>
            </ListItem>
        ),
        []
    );

    /**
     * Renderizza il layout del cliente, includendo il menu laterale e la navbar modificati, e il contenuto.
     *
     * @returns {JSX.Element} - Il layout completo con navigazione e contenuti.
     */
    return (
        <Layout
            Buttons={Buttons} // Passa i pulsanti personalizzati alla navbar
            ListItems={ListItems} // Passa gli elementi del menu laterale di "cliente" al Layout predefinito
        >
            {/* Renderizza i componenti figli passati al ClienteLayout */}
            {children}
        </Layout>
    );
}
