import { Link, usePage } from "@inertiajs/react";
import React, { useCallback, useState } from "react";
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
import { useLayout } from "../Hooks/Layouts/useLayout";

/**
 * Componente di layout per la pagina dell'operatore.
 * Gestisce la struttura del menu laterale (drawer) e la visualizzazione dei contenuti.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} Il layout dell'operatore con il menu laterale.
 */
export default function OperatoreLayout({ children }) {
    const { handleDrawerToggle, open } = useLayout(); // Recupera la funzione per aprire/chiudere il drawer (menu laterale) e lo stato di apertura del drawer

    /**
     * Componente del menu laterale contenente i link agli ordini dei clienti e alla gestione clienti.
     * @returns {JSX.Element} Gli elementi di lista con i link agli ordini e alla gestione clienti.
     */
    const ListItems = (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleDrawerToggle} // Gestisce l'apertura/chiusura del drawer al click
                    component={Link}
                    href="/operatore/ordini-clienti" // Link alla pagina "Ordini clienti"
                >
                    <ListItemIcon>
                        {/* Icona che rappresenta gli ordini dei clienti */}
                        <HistoryIcon />
                    </ListItemIcon>

                    {/* Testo della voce di menu */}
                    <ListItemText primary="Ordini clienti" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleDrawerToggle}
                    component={Link}
                    href="/operatore/gestione-clienti"
                >
                    <ListItemIcon>
                        {/* Icona che rappresenta la gestione clienti */}
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gestione clienti" />
                </ListItemButton>
            </ListItem>
        </>
    );

    /**
     * Renderizza il layout dell'operatore, includendo il menu laterale (drawer) e il contenuto.
     *
     * @returns {JSX.Element} Il layout che avvolge il contenuto e il menu laterale.
     */
    return (
        <Layout
            ListItems={ListItems} // Passa gli elementi del menu laterale di "operatore" al Layout predefinito
            open={open}
            handleDrawerToggle={handleDrawerToggle}
        >
            {children}
        </Layout>
    );
}
