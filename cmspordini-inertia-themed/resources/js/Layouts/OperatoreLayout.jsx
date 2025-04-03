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
import {
    History as HistoryIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import { useLayout } from "../Hooks/Layouts/useLayout";

/**
 * Componente di layout per la pagina dell'operatore.
 *
 * Gestisce la struttura del menu laterale (drawer) e la visualizzazione dei contenuti.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout dell'operatore con il menu laterale.
 */
export default function OperatoreLayout({ children }) {
    // Recupera la funzione per aprire/chiudere il drawer (menu laterale), lo stato di apertura del drawer e la funzione di logout
    const { handleLogout } = useLayout();

    const Buttons = useMemo(
        () => (
            <>
                <Button
                    component={Link}
                    href="/operatore/ordini-clienti"
                    sx={{ color: "#fff" }}
                >
                    Storico
                </Button>
                <Button
                    component={Link}
                    href="/operatore/gestione-clienti"
                    sx={{ color: "#fff" }}
                >
                    Clienti
                </Button>
            </>
        ),
        []
    );

    /**
     * Componente del menu laterale contenente i link agli ordini dei clienti e alla gestione clienti.
     * i quali, una volta cliccati, chiudono il drawer e indirizzano l'utente alle relative pagine.
     *
     * @returns {JSX.Element} - Gli elementi di lista con i link agli ordini e alla gestione clienti.
     */
    const ListItems = useMemo(
        () => (
            <>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/operatore/ordini-clienti"
                    >
                        {/* Icona che rappresenta gli ordini dei clienti */}
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>

                        {/* Testo della voce di menu */}
                        <ListItemText primary="Ordini clienti" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/operatore/gestione-clienti"
                    >
                        {/* Icona che rappresenta la gestione clienti */}
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>

                        {/* Testo della voce di menu */}
                        <ListItemText primary="Gestione clienti" />
                    </ListItemButton>
                </ListItem>
            </>
        ),
        []
    );

    /**
     * Renderizza il layout dell'operatore, includendo il menu laterale (drawer) e il contenuto.
     *
     * @returns {JSX.Element} - Il layout che avvolge il contenuto e il menu laterale.
     */
    return (
        <Layout
            Buttons={Buttons}
            ListItems={ListItems} // Passa gli elementi del menu laterale di "operatore" al Layout predefinito
            handleLogout={handleLogout}
        >
            {children}
        </Layout>
    );
}
