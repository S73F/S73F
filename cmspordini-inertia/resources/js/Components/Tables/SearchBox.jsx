import React from "react";

export const SearchBox = ({ handleFilter }) => {
    return (
        <div id="search-box-container">
            <input type="text" placeholder="Ricerca" onChange={handleFilter} />
        </div>
    );
};
