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
import { navbarActiveBtnStyles, navbarButtonStyles } from "../styles/appStyles";
import {
    ActiveButtonProvider,
    useActiveButton,
} from "../Contexts/ActiveButtonContext";

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
    const { activeBtn, setActiveBtn } = useActiveButton();

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
                    onClick={() => setActiveBtn("Storico")}
                    sx={
                        activeBtn === "Storico"
                            ? navbarActiveBtnStyles
                            : navbarButtonStyles
                    }
                >
                    Storico
                </Button>
                <Button
                    component={Link}
                    href="/operatore/gestione-clienti"
                    title="Gestione clienti"
                    onClick={() => setActiveBtn("Gestione clienti")}
                    sx={
                        activeBtn === "Gestione clienti"
                            ? navbarActiveBtnStyles
                            : navbarButtonStyles
                    }
                >
                    Clienti
                </Button>
            </>
        ),
        [activeBtn, setActiveBtn]
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
                        onClick={() => setActiveBtn("Storico")}
                    >
                        {/* Icona che rappresenta gli ordini dei clienti */}
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>

                        {/* Testo della voce di menu */}
                        <ListItemText primary="Storico ordini" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/operatore/gestione-clienti"
                        title="Gestione clienti"
                        onClick={() => setActiveBtn("Gestione clienti")}
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
