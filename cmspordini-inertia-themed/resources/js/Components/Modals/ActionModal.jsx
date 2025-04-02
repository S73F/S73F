import { Modal } from "@inertiaui/modal-react";
import React from "react";
import { Content } from "../Content";
import { Box, Button, Stack, Typography } from "@mui/material";
import { formBtnStyle } from "../../styles/formStyles";

const Wrapper = ({ modalRef, title, children }) => {
    return (
        <Modal ref={modalRef}>
            <Content.Layout title={title} />

            <Box sx={{ textAlign: "center" }}>{children}</Box>
        </Modal>
    );
};

const Message = ({ children }) => {
    return <Typography sx={{ mb: 1 }}>{children}</Typography>;
};

const Reminder = ({ children, color = "error" }) => {
    return (
        <Typography color={color} fontWeight="500" mb={3}>
            {children}
        </Typography>
    );
};

const Buttons = ({ action, closeModal, color = "error" }) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 3 }}
            justifyContent="center"
        >
            <Button
                variant="contained"
                color={color}
                onClick={action}
                sx={formBtnStyle}
            >
                Si
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={closeModal}
                sx={formBtnStyle}
            >
                No
            </Button>
        </Stack>
    );
};

export const ActionModal = {
    Wrapper,
    Message,
    Reminder,
    Buttons,
};
