import React, { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, columns }) {
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
                    border: 0,
                    "& .headerColumn": { bgcolor: "#1976d2", color: "#fff" },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        whiteSpace: "normal",
                        lineHeight: "1.2",
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
}
