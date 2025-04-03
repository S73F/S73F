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
 * Estende il layout principale (`Layout`) aggiungendo dei pulsanti specifici per l'operatore.
 *
 * @component
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli da renderizzare all'interno del layout.
 * @returns {JSX.Element} - Il layout dell'operatore con il menu laterale e i pulsanti di navigazione.
 */
export default function OperatoreLayout({ children }) {
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
                    href="/operatore/ordini-clienti"
                    title="Storico ordini clienti"
                    sx={{ color: "#fff" }}
                >
                    Storico
                </Button>
                <Button
                    component={Link}
                    href="/operatore/gestione-clienti"
                    title="Gestione clienti"
                    sx={{ color: "#fff" }}
                >
                    Clienti
                </Button>
            </>
        ),
        []
    );

    /**
     * Elementi del menu laterale (drawer).
     * Contiene collegamenti alle sezioni "Ordini clienti" e "Gestione clienti".
     *
     * @constant
     * @type {React.ReactNode}
     */
    const ListItems = useMemo(
        () => (
            <>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/operatore/ordini-clienti"
                        title="Storico ordini clienti"
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
                        title="Gestione clienti"
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
     * Renderizza il layout dell'operatore, includendo il menu laterale e la navbar modificati, e il contenuto.
     *
     * @returns {JSX.Element} - Il layout completo con navigazione e contenuti.
     */
    return (
        <Layout
            Buttons={Buttons} // Passa i pulsanti personalizzati alla navbar
            ListItems={ListItems} // Passa gli elementi del menu laterale di "operatore" al Layout predefinito
        >
            {children}
        </Layout>
    );
}
