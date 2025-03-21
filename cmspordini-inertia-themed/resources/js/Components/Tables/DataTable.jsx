import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, Select, Typography } from "@mui/material";

const Layout = ({ title, children }) => {
    return (
        <>
            <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 4, textAlign: "center" }}
            >
                {title}
            </Typography>
            {children}
        </>
    );
};

const Selector = ({ inputLabel, handleChange, children }) => {
    return (
        <>
            <FormControl sx={{ width: "80%", mb: 4 }}>
                <InputLabel id="input-label">{inputLabel}</InputLabel>
                <Select
                    labelId="selector-label"
                    id="selector"
                    defaultValue=""
                    label={inputLabel}
                    onChange={handleChange}
                    sx={{ textAlign: "left" }}
                >
                    {children}
                </Select>
            </FormControl>
        </>
    );
};

const paginationModel = { page: 0, pageSize: 5 };

const Table = ({ rows, columns }) => {
    return (
        <Paper sx={{ width: "100%", maxWidth: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 25, 50]}
                headerHeight={70}
                rowHeight={70}
                sx={{
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
                }}
            />
        </Paper>
    );
};

export const DataTable = { Layout, Selector, Table };
