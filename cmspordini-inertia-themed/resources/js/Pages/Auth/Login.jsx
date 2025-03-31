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

export default function Login() {
    // Custom hook per la gestione del login
    const { data, processing, handleChange, handleSubmit } = useLogin();

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

            <ToastContainer position="bottom-right" closeOnClick={true} />
        </Container>
    );
}
