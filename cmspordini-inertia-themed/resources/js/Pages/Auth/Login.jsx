import React from "react";
import { useLogin } from "../../Hooks/Auth/useLogin";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { ToastContainer } from "react-toastify";

/**
 * Componente per la pagina di login dell'applicazione.
 * Gestisce il modulo di login, includendo i campi per username e password,
 * e la gestione dell'invio del modulo.
 *
 * @returns {JSX.Element} La UI per la pagina di login.
 */
export default function Login() {
    const { data, processing, handleChange, handleSubmit } = useLogin(); // Custom hook per la gestione del login

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 3,
                }}
            >
                {/* Logo */}
                <Box
                    component="img"
                    src="/assets/img/ODONTOTECNICA-LOGO.svg"
                    sx={{ width: 150, mb: 3 }}
                />
                <Typography component="h1" variant="h5">
                    Accedi
                </Typography>

                {/* Form di login */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={data.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={processing}
                        disabled={processing}
                        size="large"
                    >
                        Accedi
                    </Button>
                </Box>
            </Paper>

            {/* Componente per le notifiche di errore */}
            <ToastContainer position="bottom-right" closeOnClick={true} />
        </Container>
    );
}
