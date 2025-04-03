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
 * Gestisce la struttura del menu laterale (drawer) e la visualizzazione dei contenuti.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout del cliente con il menu laterale.
 */
export default function ClienteLayout({ children }) {
    // Recupera la funzione per aprire/chiudere il drawer (menu laterale), lo stato di apertura del drawer e la funzione di logout
    const { handleDrawerToggle, open, handleLogout } = useLayout();

    const Buttons = useMemo(
        () => (
            <>
                <Button
                    component={Link}
                    href="/cliente/ordini/storico"
                    sx={{ color: "#fff" }}
                >
                    Storico
                </Button>
            </>
        ),
        []
    );

    /**
     * Componente per il menu laterale, che contiene un elemento di lista per lo storico ordini,
     * il quale, una volta cliccato, chiude il drawer e indirizza l'utente alla relativa pagina.
     *
     * @returns {JSX.Element} - L'elemento di lista con il link per lo storico ordini.
     */
    const ListItems = useMemo(
        () => (
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleDrawerToggle}
                    component={Link}
                    href="/cliente/ordini/storico"
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
     * Renderizza il layout del cliente, includendo il menu laterale (drawer) e il contenuto.
     *
     * @returns {JSX.Element} - Il layout che avvolge il contenuto e il menu laterale.
     */
    return (
        <Layout
            Buttons={Buttons}
            ListItems={ListItems} // Passa gli elementi del menu laterale di "cliente" al Layout predefinito
            open={open}
            handleDrawerToggle={handleDrawerToggle}
            handleLogout={handleLogout}
        >
            {/* Renderizza i componenti figli passati al ClienteLayout */}
            {children}
        </Layout>
    );
}
