import { Link } from "@inertiajs/react";
import React, { useMemo } from "react";
import {
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
 * Gestisce la struttura del menu laterale (drawer) e la visualizzazione dei contenuti.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} Il layout del cliente con il menu laterale.
 */
export default function ClienteLayout({ children }) {
    const { handleDrawerToggle, open, handleLogout } = useLayout(); // Recupera la funzione per aprire/chiudere il drawer (menu laterale) e lo stato di apertura del drawer

    /**
     * Componente per il menu laterale, che contiene un elemento di lista per lo storico ordini.
     * @returns {JSX.Element} L'elemento di lista con il link per lo storico ordini.
     */
    const ListItems = useMemo(
        () => (
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleDrawerToggle} // Gestisce l'apertura/chiusura del drawer al click
                    component={Link}
                    href="/cliente/ordini/storico" // Link alla pagina "Storico ordini"
                >
                    <ListItemIcon>
                        {/* Icona che rappresenta lo storico ordini */}
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
     * Renderizza il layout dell'cliente, includendo il menu laterale (drawer) e il contenuto.
     *
     * @returns {JSX.Element} Il layout che avvolge il contenuto e il menu laterale.
     */
    return (
        <Layout
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
