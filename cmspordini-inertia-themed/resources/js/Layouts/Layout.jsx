import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { Head, Link } from "@inertiajs/react";
import { ListItemIcon, Tooltip } from "@mui/material";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useState } from "react";
import { useLayout } from "../Hooks/Layouts/useLayout";
import {
    mobileActiveBtnStyles,
    navbarActiveBtnStyles,
    navbarButtonStyles,
} from "../styles/appStyles";
import { useActiveButton } from "../Contexts/ActiveButtonContext";

const drawerWidth = 240;

/**
 * Componente di layout principale che gestisce la struttura dell'applicazione,
 * includendo una barra di navigazione, un menu a scomparsa (drawer) e il contenuto principale.
 *
 * @component
 * @param {Object} props - Proprietà del componente.
 * @param {function} [props.window] - Funzione opzionale per ottenere l'oggetto window (necessario per il rendering in iframe).
 * @param {React.ReactNode} props.children - Contenuto principale da visualizzare nella pagina.
 * @param {React.ReactNode} [props.Buttons] - Pulsanti aggiuntivi da mostrare nella barra di navigazione.
 * @param {React.ReactNode} [props.ListItems] - Elementi della lista da visualizzare nel menu laterale.
 * @param {function} props.handleLogout - Funzione chiamata al click del pulsante di logout.
 *
 * @returns {JSX.Element} Il layout dell'applicazione.
 */
function Layout({ window, children, Buttons, ListItems }) {
    const { activeBtn, setActiveBtn } = useActiveButton();
    const [mobileOpen, setMobileOpen] = useState(false); // Alterna apertura/chiusura del drawer

    const { handleLogout } = useLayout(); // Recupera la funzione di logout dall'hook

    /**
     * Gestisce l'apertura e la chiusura del drawer laterale.
     */
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    /**
     * Contenuto del drawer laterale, che include il logo, la navigazione e il pulsante di logout.
     */
    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link
                    href="/"
                    title="Logo CMSPordini"
                    onClick={() => setActiveBtn("Home")}
                >
                    CMSPordini
                </Link>
            </Typography>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        component={Link}
                        href="/"
                        title="Home"
                        onClick={() => setActiveBtn("Home")}
                        sx={activeBtn === "Home" ? mobileActiveBtnStyles : {}}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                {/* Renderizza eventuali voci di menu aggiuntive */}
                {ListItems}

                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} title="Logout">
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>

            {/* Contenitore per il logo CMSP nel drawer */}
            <Box
                sx={{
                    mt: "auto", // Margine superiore automatico per spingere l'immagine in basso
                    mb: 5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="a"
                    title="Sito WEB Centro Medico San Pietro"
                    href="https://www.centromedicosanpietro.it/"
                    target="_blank"
                >
                    <Box
                        component="img"
                        src="/assets/img/ODONTOTECNICA-LOGO.svg"
                        loading="lazy" // Abilita il caricamento lazy per l'immagine
                        sx={{
                            width: 150,
                            "&:hover": {
                                opacity: "0.7", // Cambia l'opacità al passaggio del mouse
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>

            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", sm: "block" },
                                userSelect: "none",
                            }}
                        >
                            <Link
                                href="/"
                                title="Logo CMSPordini"
                                onClick={() => setActiveBtn("Home")}
                            >
                                CMSPordini
                            </Link>
                        </Typography>

                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <Button
                                component={Link}
                                href="/"
                                title="Home"
                                onClick={() => setActiveBtn("Home")}
                                sx={
                                    activeBtn === "Home"
                                        ? navbarActiveBtnStyles
                                        : navbarButtonStyles
                                }
                            >
                                Home
                            </Button>

                            {Buttons}

                            <Button
                                onClick={handleLogout}
                                title="Logout"
                                sx={navbarButtonStyles}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box
                    component="main"
                    sx={{
                        p: 3,
                        width: "100%",
                        flexGrow: 1,
                        overflowX: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Spazio per compensare l'AppBar fissa */}
                    <Toolbar />

                    {children}

                    <ToastContainer position="bottom-right" closeOnClick />
                </Box>
            </Box>
        </>
    );
}

export default Layout;
