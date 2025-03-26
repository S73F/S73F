export const dataTableStyle = {
    "& .headerColumn": {
        bgcolor: "#1976d2",
        color: "#fff",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        whiteSpace: "normal",
        lineHeight: "1.2",
        wordBreak: "break-word",
        textAlign: "left",
    },
    "& .MuiDataGrid-cell": {
        whiteSpace: "normal",
        lineHeight: "1.4",
        wordBreak: "break-word",
        display: "flex",
        alignItems: "center",
    },
    "& .MuiDataGrid-selectedRowCount": {
        display: "none",
    },
};

export const iconStyle = {
    color: "inherit",
    "&:hover": { color: "#1976d2" },
    mr: 0.5,
};

export const anchorStyle = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: "#1976d2 " },
};

export const chipStyle = {
    height: 32,
    fontWeight: 550,
    fontSize: "0.875rem",
    width: 110,
    borderRadius: "16px",
    pl: 0.5,
    pr: 0.5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
};

export const chipColors = {
    nuovo: { backgroundColor: "#ffe6e6" },
    inCorso: { backgroundColor: "#fffbb5" },
    spedito: { backgroundColor: "#b5ffb5" },
};

export const circleStyles = {
    nuovo: { fill: "#ff0000", width: 20 },
    inCorso: { fill: "#ffbf00", width: 20 },
    spedito: { fill: "#00c400", width: 20 },
};

export const badgeStyle = {
    "& .MuiBadge-badge": {
        width: 27,
        height: 27,
        border: "2px solid #fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        userSelect: "none",
        fontSize: 15,
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

export const formBtnStyle = {
    width: { xs: "100%", sm: 100, md: 200 },
    height: { xs: 50, sm: 70 },
};
