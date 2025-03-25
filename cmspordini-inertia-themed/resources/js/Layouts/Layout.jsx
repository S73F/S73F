import React from "react";
import {
    styled,
    useTheme,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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

// Il Main si sposta solo in desktop (persistent)
const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: isMobile ? 0 : open ? 0 : `-${drawerWidth}px`,
    ...(open &&
        !isMobile && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    minHeight: "100vh",
    width: "100vw",
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open &&
        !isMobile && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
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
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);
    const { handleLogout } = useLayout();

    const handleDrawerToggle = () => {
        setOpen((prev) => !prev);
    };

    const drawerContent = (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <DrawerHeader>
                {!isMobile && (
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                )}
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
    );

    return (
        <ThemeProvider theme={appTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} isMobile={isMobile}>
                    <Toolbar>
                        {(!open || isMobile) && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                edge="start"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
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
                    variant={isMobile ? "temporary" : "persistent"}
                    anchor="left"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerContent}
                </Drawer>
                <Main open={open} isMobile={isMobile}>
                    <DrawerHeader />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "100%",
                            minHeight: {
                                xs: `calc(100vh - 56px)`,
                                sm: `calc(100vh - 64px)`,
                            },
                            bgcolor: "#f5f5f5",
                            p: 3,
                            boxSizing: "border-box",
                        }}
                    >
                        {children}
                    </Box>
                    <ToastContainer position="bottom-right" closeOnClick />
                </Main>
            </Box>
        </ThemeProvider>
    );
}

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import { Home as HomeIcon, Logout as LogoutIcon } from "@mui/icons-material";
// import { Link } from "@inertiajs/react";
// import { ToastContainer } from "react-toastify";
// import { useLayout } from "../Hooks/Layouts/useLayout";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { itIT } from "@mui/x-data-grid/locales";

// const theme = createTheme(
//     {
//         palette: {
//             primary: { main: "#1976d2" },
//         },
//     },
//     itIT
// );

// const drawerWidth = 240;

// export default function Layout({ ListItems, children }) {
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const [isClosing, setIsClosing] = React.useState(false);
//     const { handleLogout } = useLayout();

//     const handleDrawerClose = () => {
//         setIsClosing(true);
//         setMobileOpen(false);
//     };

//     const handleDrawerTransitionEnd = () => {
//         setIsClosing(false);
//     };

//     const handleDrawerToggle = () => {
//         if (!isClosing) {
//             setMobileOpen(!mobileOpen);
//         }
//     };

//     const drawer = (
//         <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//             <Toolbar />
//             <List>
//                 <ListItem disablePadding>
//                     <ListItemButton component={Link} href="/">
//                         <ListItemIcon>
//                             <HomeIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Home" />
//                     </ListItemButton>
//                 </ListItem>

//                 {ListItems}

//                 <ListItem disablePadding>
//                     <ListItemButton onClick={handleLogout}>
//                         <ListItemIcon>
//                             <LogoutIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="Logout" />
//                     </ListItemButton>
//                 </ListItem>
//             </List>
//             <Box
//                 sx={{
//                     mt: "auto",
//                     mb: 5,
//                     display: "flex",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Box
//                     component="a"
//                     href="https://www.centromedicosanpietro.it/"
//                     target="_blank"
//                 >
//                     <Box
//                         component="img"
//                         src="/assets/img/ODONTOTECNICA-LOGO.svg"
//                         sx={{
//                             width: 150,
//                             "&:hover": {
//                                 opacity: "0.7",
//                             },
//                         }}
//                     />
//                 </Box>
//             </Box>
//         </Box>
//     );

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ display: "flex" }}>
//                 <CssBaseline />
//                 <AppBar
//                     position="fixed"
//                     sx={{
//                         width: { sm: `calc(100% - ${drawerWidth}px)` },
//                         ml: { sm: `${drawerWidth}px` },
//                     }}
//                 >
//                     <Toolbar>
//                         <IconButton
//                             color="inherit"
//                             aria-label="open drawer"
//                             edge="start"
//                             onClick={handleDrawerToggle}
//                             sx={{ mr: 2, display: { sm: "none" } }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography
//                             variant="h6"
//                             noWrap
//                             component={Link}
//                             href="/"
//                             sx={{ textDecoration: "none", color: "white" }}
//                         >
//                             Gruppo CMSP
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//                 <Box
//                     component="nav"
//                     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//                 >
//                     {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//                     <Drawer
//                         variant="temporary"
//                         open={mobileOpen}
//                         onTransitionEnd={handleDrawerTransitionEnd}
//                         onClose={handleDrawerClose}
//                         sx={{
//                             display: { xs: "block", sm: "none" },
//                             "& .MuiDrawer-paper": {
//                                 boxSizing: "border-box",
//                                 width: drawerWidth,
//                             },
//                         }}
//                         slotProps={{
//                             root: {
//                                 keepMounted: true, // Better open performance on mobile.
//                             },
//                         }}
//                     >
//                         {drawer}
//                     </Drawer>
//                     <Drawer
//                         variant="permanent"
//                         sx={{
//                             display: { xs: "none", sm: "block" },
//                             "& .MuiDrawer-paper": {
//                                 boxSizing: "border-box",
//                                 width: drawerWidth,
//                             },
//                         }}
//                         open
//                     >
//                         {drawer}
//                     </Drawer>
//                 </Box>
//                 <Box
//                     component="main"
//                     sx={{
//                         flexGrow: 1,
//                         width: {
//                             xs: "100%",
//                             sm: `calc(100% - ${drawerWidth}px)`,
//                         },
//                         maxWidth: {
//                             xs: "100%",
//                             sm: `calc(100% - ${drawerWidth}px)`,
//                         },
//                     }}
//                 >
//                     <Toolbar />
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             minHeight: {
//                                 xs: `calc(100vh - 48px)`,
//                                 sm: `calc(100vh - 64px)`,
//                             },
//                             bgcolor: "#f5f5f5",
//                             p: 3,
//                         }}
//                     >
//                         {children}
//                     </Box>
//                 </Box>

//                 <ToastContainer position="bottom-right" closeOnClick={true} />
//             </Box>
//         </ThemeProvider>
//     );
// }
