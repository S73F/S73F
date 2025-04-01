import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, Select } from "@mui/material";
import { dataTableStyle } from "../../styles/tableStyles";

/**
 * Componente Selector che rende una tendina con opzioni selezionabili.
 * Permette all'utente di selezionare un'opzione e attiva una funzione di gestione quando la selezione cambia.
 *
 * @param {string} inputLabel - Etichetta da visualizzare per il campo Select
 * @param {function} handleChange - Funzione che gestisce i cambiamenti del valore selezionato
 * @param {ReactNode} children - Le opzioni da visualizzare all'interno del Select
 * @returns {JSX.Element} Una tendina con opzioni selezionabili
 */
const Selector = ({ inputLabel, handleChange, children }) => {
    return (
        <>
            {/* FormControl viene utilizzato per avvolgere il selettore */}
            <FormControl sx={{ width: "80%", mb: 4 }}>
                {/* InputLabel viene utilizzato per visualizzare l'etichetta sopra il campo Select */}
                <InputLabel id="input-label">{inputLabel}</InputLabel>

                {/* Select crea una lista a tendina con opzioni */}
                <Select
                    labelId="selector-label"
                    id="selector"
                    defaultValue="" // Valore iniziale vuoto
                    label={inputLabel}
                    onChange={handleChange} // Chiamata alla funzione handleChange quando cambia il valore selezionato
                    sx={{ textAlign: "left" }}
                >
                    {/* Qui vengono renderizzate le opzioni (children) passate come parametro */}
                    {children}
                </Select>
            </FormControl>
        </>
    );
};

const paginationModel = { page: 0, pageSize: 5 }; // Paginazione predefinita: prima pagina, 5 righe per pagina

/**
 * Componente Table che renderizza il DataGrid (tabella) di MUI con le righe e le colonne fornite.
 *
 * @param {Array} rows - I dati da visualizzare nella tabella
 * @param {Array} columns - La definizione delle colonne della tabella
 * @returns {JSX.Element} La tabella avvolta in un componente Paper con paginazione e stile personalizzato
 */
const Table = ({ rows, columns }) => {
    return (
        <Paper elevation={5} sx={{ width: "100%" }}>
            <DataGrid
                rows={rows} // Le righe di dati da visualizzare nella tabella
                columns={columns} // La definizione delle colonne, come intestazioni, larghezza, ecc.
                initialState={{ pagination: { paginationModel } }} // Imposta la paginazione iniziale
                pageSizeOptions={[5, 10, 25, 50]} // Le opzioni per il numero di righe per pagina che l'utente può selezionare
                columnHeaderHeight={70} // Imposta l'altezza delle intestazioni delle colonne
                rowHeight={90} // Imposta l'altezza delle righe
                sx={dataTableStyle} // Stili personalizzati per la tabella
            />
        </Paper>
    );
};

export const DataTable = { Selector, Table };
