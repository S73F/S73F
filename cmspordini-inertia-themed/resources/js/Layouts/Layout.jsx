import * as React from "react";
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
import { Link } from "@inertiajs/react";
import { ListItemIcon } from "@mui/material";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useState } from "react";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Layout({ window, children, Buttons, ListItems, handleLogout }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                CMSPordini
            </Typography>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleDrawerToggle}
                        component={Link}
                        href="/"
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
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
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
                        CMSPordini
                    </Typography>

                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Button
                            component={Link}
                            href="/"
                            sx={{ color: "#fff" }}
                        >
                            Home
                        </Button>

                        {Buttons}

                        <Button onClick={handleLogout} sx={{ color: "#fff" }}>
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
                <Toolbar />

                {children}

                <ToastContainer position="bottom-right" closeOnClick />
            </Box>
        </Box>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Layout;

// import React, { useMemo } from "react";
// import {
//     styled,
//     useTheme,
//     createTheme,
//     ThemeProvider,
// } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Drawer from "@mui/material/Drawer";
// import Divider from "@mui/material/Divider";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
// import { Link } from "@inertiajs/react";
// import { ToastContainer } from "react-toastify";
// import { useLayout } from "../Hooks/Layouts/useLayout";
// import { itIT } from "@mui/x-data-grid/locales";

// // Creazione del tema personalizzato per l'applicazione, con una palette di colori personalizzata
// const appTheme = createTheme(
//     {
//         palette: {
//             primary: { main: "#1976d2" }, // Colore principale del tema
//         },
//     },
//     itIT // Impostazione della lingua italiana (per il componente DataGrid)
// );

// const drawerWidth = 240; // Definisce la larghezza del Drawer (menu laterale)

// /**
//  * Stile personalizzato per il contenitore principale dell'applicazione.
//  * @param {Object} theme - Il tema corrente dell'applicazione.
//  * @returns {Object} Oggetto di stile per il contenitore principale.
//  */
// const Main = styled("main")(({ theme }) => ({
//     flexGrow: 1,
//     minHeight: "100vh",
//     overflowX: "hidden",
//     backgroundColor: "#f5f5f5",
//     padding: theme.spacing(3),
//     display: "flex",
//     flexDirection: "column",
// }));

// /**
//  * Stile personalizzato per la AppBar (barra superiore) dell'applicazione.
//  * @param {Object} theme - Il tema corrente dell'applicazione.
//  * @returns {Object} Oggetto di stile per l'AppBar.
//  */
// const AppBar = styled(MuiAppBar)(({ theme }) => ({
//     transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
// }));

// /**
//  * Stile per la parte superiore del drawer (menu laterale).
//  * @param {Object} theme - Il tema corrente dell'applicazione.
//  * @returns {Object} Oggetto di stile per l'header del drawer.
//  */
// const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar, // Usa il mixin 'toolbar' per allineare gli elementi
//     justifyContent: "flex-end",
// }));

// /**
//  * Layout del contenuto principale dell'applicazione, comprensivo di un drawer (menu laterale).
//  * Gestisce l'aspetto della barra superiore (AppBar), il drawer laterale e il contenuto principale.
//  *
//  * @param {Object} props - Le proprietà del componente Layout.
//  * @param {React.ReactNode} props.children - I componenti figli da visualizzare nel layout.
//  * @param {React.ReactNode} props.ListItems - Gli elementi di lista da visualizzare nel drawer.
//  * @param {boolean} props.open - Stato che indica se il drawer è aperto o chiuso.
//  * @param {function} props.handleDrawerToggle - Funzione per aprire/chiudere il drawer.
//  * @returns {JSX.Element} - Il layout dell'applicazione con drawer e contenuto principale.
//  */
// export default function Layout({
//     children,
//     ListItems,
//     open,
//     handleDrawerToggle,
//     handleLogout,
// }) {
//     const theme = useTheme(); // Recupera il tema corrente

//     /**
//      * Contenuto del drawer, memorizzato tramite useMemo per evitare ricalcoli inutili.
//      *
//      * @returns {JSX.Element} - Il contenuto del drawer, che include voci di menu e altre informazioni.
//      */
//     const drawerContent = useMemo(
//         () => (
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100%",
//                 }}
//             >
//                 {/* Componente per la parte superiore dell'header */}
//                 <DrawerHeader>
//                     {/* Icona per chiudere il drawer */}
//                     <IconButton onClick={handleDrawerToggle}>
//                         {theme.direction === "ltr" ? (
//                             <ChevronLeftIcon />
//                         ) : (
//                             <ChevronRightIcon />
//                         )}
//                     </IconButton>
//                 </DrawerHeader>

//                 {/* Divisore tra header e la lista */}
//                 <Divider />

//                 {/* Lista di collegamenti del drawer */}
//                 <List>
//                     <ListItem disablePadding>
//                         <ListItemButton
//                             onClick={handleDrawerToggle}
//                             component={Link}
//                             href="/"
//                         >
//                             <ListItemIcon>
//                                 <HomeIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Home" />
//                         </ListItemButton>
//                     </ListItem>

//                     {/* Renderizza eventuali voci di menu aggiuntive */}
//                     {ListItems}

//                     <ListItem disablePadding>
//                         <ListItemButton onClick={handleLogout}>
//                             <ListItemIcon>
//                                 <LogoutIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Logout" />
//                         </ListItemButton>
//                     </ListItem>
//                 </List>
//                 {/* Contenitore per il logo CMSP nel drawer */}
//                 <Box
//                     sx={{
//                         mt: "auto", // Margine superiore automatico per spingere l'immagine in basso
//                         mb: 5,
//                         display: "flex",
//                         justifyContent: "center",
//                     }}
//                 >
//                     <Box
//                         component="a"
//                         href="https://www.centromedicosanpietro.it/"
//                         target="_blank"
//                     >
//                         <Box
//                             component="img"
//                             src="/assets/img/ODONTOTECNICA-LOGO.svg"
//                             loading="lazy" // Abilita il caricamento lazy per l'immagine
//                             sx={{
//                                 width: 150,
//                                 "&:hover": {
//                                     opacity: "0.7", // Cambia l'opacità al passaggio del mouse
//                                 },
//                             }}
//                         />
//                     </Box>
//                 </Box>
//             </Box>
//         ),
//         [handleLogout, ListItems, theme.direction]
//     );

//     /**
//      * Renderizza il layout con il tema personalizzato, la barra superiore (AppBar), il drawer laterale e il contenuto principale.
//      *
//      * @returns {JSX.Element} - Il layout completo dell'applicazione.
//      */
//     return (
//         // Applica il tema personalizzato
//         <ThemeProvider theme={appTheme}>
//             <Box sx={{ display: "flex" }}>
//                 {/* Aggiunge gli stili base per il reset del CSS */}
//                 <CssBaseline />

//                 {/* Barra superiore fissa */}
//                 <AppBar position="fixed">
//                     <Toolbar>
//                         <IconButton
//                             color="inherit"
//                             aria-label="open drawer"
//                             onClick={handleDrawerToggle}
//                             edge="start"
//                             sx={{ mr: 2 }}
//                         >
//                             {/* Icona del menu per aprire il drawer */}
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             component={Link}
//                             href="/"
//                             sx={{ textDecoration: "none", color: "white" }}
//                         >
//                             CMSP ordini
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <Drawer
//                     sx={{
//                         width: drawerWidth,
//                         flexShrink: 0,
//                         "& .MuiDrawer-paper": {
//                             width: drawerWidth,
//                             boxSizing: "border-box",
//                         },
//                     }}
//                     variant="temporary"
//                     anchor="left"
//                     open={open}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{ keepMounted: true }}
//                 >
//                     {/* Contenuto del drawer */}
//                     {drawerContent}
//                 </Drawer>
//                 <Main>
//                     <DrawerHeader />

//                     {/* Renderizza i figli passati come prop */}
//                     {children}

//                     {/* Componente di notifica */}
//                     <ToastContainer position="bottom-right" closeOnClick />
//                 </Main>
//             </Box>
//         </ThemeProvider>
//     );
// }
