export const contentContainer = {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: 4,
    py: 6,
};

export const badgeStyle = {
    "& .MuiBadge-badge": {
        width: 27,
        height: 27,
        border: "2px solid #fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        userSelect: "none",
        fontSize: 12,
        fontWeight: "600",
    },
};

export const buttonStyles = {
    fontWeight: "bold",
    px: 3,
    py: 1,
    width: 170,
    textAlign: "left",
};

export const creazioneClienteBtn = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100px",
    height: "40px",
    mt: -2,
    mb: 6,
    textDecoration: "none",
    "&:hover": {
        opacity: "0.8",
    },
};
