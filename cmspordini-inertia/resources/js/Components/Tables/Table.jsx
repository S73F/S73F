import React from "react";
import "../../../css/table.css";
import Pagination from "./Pagination";

const TableLayout = ({ title, data, children }) => {
    return (
        <div id="table-container">
            {title && <h3 className="table-title">{title}</h3>}
            {children}
            {data.links?.length > 1 && <Pagination links={data.links} />}
        </div>
    );
};

const TableContent = ({ children }) => {
    return <table id="table-content">{children}</table>;
};

const TableHead = ({ children }) => {
    return (
        <thead>
            <tr>{children}</tr>
        </thead>
    );
};

const TableBody = ({ renderRow, data }) => {
    return (
        <tbody>
            {data.map((singleData, index) => (
                <tr key={index}>{renderRow(singleData)}</tr>
            ))}
        </tbody>
    );
};

const Table = {
    Layout: TableLayout,
    Content: TableContent,
    Head: TableHead,
    Body: TableBody,
};

export default Table;
