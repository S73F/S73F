import React from "react";
import {
    styled,
    useTheme,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { Link } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import { useLayout } from "../Hooks/Layouts/useLayout";
import { itIT } from "@mui/x-data-grid/locales";

const appTheme = createTheme(
    {
        palette: {
            primary: { main: "#1976d2" },
        },
    },
    itIT
);

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
    flexGrow: 1,
    minHeight: "100vh",
    overflowX: "hidden",
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function Layout({ children, ListItems }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { handleLogout } = useLayout();

    const handleDrawerToggle = React.useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const drawerContent = React.useMemo(
        () => (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
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
                <Box
                    sx={{
                        mt: "auto",
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
                            sx={{
                                width: 150,
                                "&:hover": {
                                    opacity: "0.7",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        ),
        [handleDrawerToggle, handleLogout, ListItems, theme.direction]
    );

    return (
        <ThemeProvider theme={appTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{ textDecoration: "none", color: "white" }}
                        >
                            CMSP ordini
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="temporary"
                    anchor="left"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerContent}
                </Drawer>
                <Main>
                    <DrawerHeader />
                    {children}
                    <ToastContainer position="bottom-right" closeOnClick />
                </Main>
            </Box>
        </ThemeProvider>
    );
}
