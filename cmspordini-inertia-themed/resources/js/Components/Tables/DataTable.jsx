import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    Typography,
} from "@mui/material";
import { dataTableStyle } from "../../styles/tableStyles";

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
        <Paper elevation={5} sx={{ width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 25, 50]}
                columnHeaderHeight={70}
                rowHeight={90}
                sx={dataTableStyle}
            />
        </Paper>
    );
};

export const DataTable = { Selector, Table };
