import React from "react";

const TableLayout = ({ title }) => {
    return <div id="table-container">{title && title}</div>;
};

const TableContent = ({ children }) => {
    return <table id="table-content">{children}</table>;
};

const Table = {
    Layout: TableLayout,
    Content: TableContent,
};

export default Table;
