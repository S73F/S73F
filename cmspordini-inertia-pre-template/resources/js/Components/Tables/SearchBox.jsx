import React from "react";

export const SearchBox = ({ handleFilter }) => {
    return (
        <div id="search-box-container">
            <input
                id="search-box"
                type="text"
                placeholder="Ricerca"
                onChange={handleFilter}
            />
        </div>
    );
};
