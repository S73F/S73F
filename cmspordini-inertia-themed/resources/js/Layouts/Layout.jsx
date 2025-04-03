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
import { Link } from "@inertiajs/react";
import { ListItemIcon } from "@mui/material";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useState } from "react";

const drawerWidth = 240;

function Layout({ window, children, Buttons, ListItems, handleLogout }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

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
                CMSPordini
            </Typography>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/">
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
