/**
 * Stili personalizzati per la tabella dei dati (DataGrid).
 *
 * @constant {Object} dataTableStyle
 * @property {Object} "& .headerColumn" - Stile per l'intestazione delle colonne.
 * @property {string} "& .headerColumn.bgcolor" - Colore di sfondo dell'intestazione (#1976d2, blu).
 * @property {string} "& .headerColumn.color" - Colore del testo dell'intestazione (bianco).
 * @property {Object} "& .MuiDataGrid-columnHeaderTitle" - Stili per i titoli delle colonne.
 * @property {string} "& .MuiDataGrid-columnHeaderTitle.whiteSpace" - Impedisce il troncamento del testo.
 * @property {string} "& .MuiDataGrid-columnHeaderTitle.lineHeight" - Altezza della linea del testo.
 * @property {string} "& .MuiDataGrid-columnHeaderTitle.wordBreak" - Permette la suddivisione delle parole lunghe.
 * @property {string} "& .MuiDataGrid-columnHeaderTitle.textAlign" - Allinea il testo a sinistra.
 * @property {Object} "& .MuiDataGrid-cell" - Stili per le celle della tabella.
 * @property {string} "& .MuiDataGrid-cell.whiteSpace" - Testo a capo per evitare il troncamento.
 * @property {string} "& .MuiDataGrid-cell.lineHeight" - Altezza della linea del testo nelle celle.
 * @property {string} "& .MuiDataGrid-cell.wordBreak" - Permette la suddivisione delle parole lunghe nelle celle.
 * @property {string} "& .MuiDataGrid-cell.display" - Usa il display flex per un migliore allineamento.
 * @property {string} "& .MuiDataGrid-cell.alignItems" - Centra il contenuto verticalmente.
 * @property {Object} "& .MuiDataGrid-selectedRowCount" - Nasconde il contatore delle righe selezionate.
 * @property {string} "& .MuiDataGrid-selectedRowCount.display" - Imposta il display a "none".
 */
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

/**
 * Stili per le icone interattive.
 *
 * @constant {Object} iconStyle
 * @property {string} color - Colore di default ereditato.
 * @property {Object} "&:hover" - Stile quando il cursore è sopra l'icona.
 * @property {string} "&:hover.color" - Cambia colore in blu (#1976d2).
 * @property {number} mr - Margine destro di 0.5.
 */
export const iconStyle = {
    color: "inherit",
    "&:hover": { color: "#1976d2" },
    mr: 0.5,
};

/**
 * Stili per i link testuali (ancore).
 *
 * @constant {Object} anchorStyle
 * @property {string} color - Colore di default ereditato.
 * @property {string} textDecoration - Nessuna sottolineatura predefinita.
 * @property {Object} "&:hover" - Stile quando il cursore è sopra il link.
 * @property {string} "&:hover.color" - Cambia colore in blu (#1976d2).
 */
export const anchorStyle = {
    color: "inherit",
    textDecoration: "none",
    "&:hover": { color: "#1976d2 " },
};

/**
 * Stile di base per un Chip (etichetta visiva).
 *
 * @constant {Object} chipStyle
 * @property {number} height - Altezza di 32px.
 * @property {number} fontWeight - Peso del carattere (550).
 * @property {string} fontSize - Dimensione del testo (0.875rem).
 * @property {number} width - Larghezza di 110px.
 * @property {string} borderRadius - Angoli arrotondati di 16px.
 * @property {number} pl - Padding sinistro di 0.5.
 * @property {number} pr - Padding destro di 0.5.
 * @property {string} display - Utilizza flexbox.
 * @property {string} alignItems - Centra il contenuto verticalmente.
 * @property {string} backgroundColor - Colore di sfondo chiaro azzurro (#e3f2fd).
 */
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

/**
 * Colori per i diversi stati dei Chip.
 *
 * @constant {Object} chipColors
 * @property {Object} nuovo - Stile per lo stato "nuovo".
 * @property {string} nuovo.backgroundColor - Sfondo rosato chiaro (#ffe6e6).
 * @property {Object} inCorso - Stile per lo stato "in corso".
 * @property {string} inCorso.backgroundColor - Sfondo giallo chiaro (#fffbb5).
 * @property {Object} spedito - Stile per lo stato "spedito".
 * @property {string} spedito.backgroundColor - Sfondo verde chiaro (#b5ffb5).
 */
export const chipColors = {
    nuovo: { backgroundColor: "#ffe6e6" },
    inCorso: { backgroundColor: "#fffbb5" },
    spedito: { backgroundColor: "#b5ffb5" },
};

/**
 * Stili per i cerchi colorati associati agli stati.
 *
 * @constant {Object} circleStyles
 * @property {Object} nuovo - Stile per lo stato "nuovo".
 * @property {string} nuovo.fill - Colore rosso per il cerchio (#ff0000).
 * @property {number} nuovo.width - Dimensione del cerchio (20px).
 * @property {Object} inCorso - Stile per lo stato "in corso".
 * @property {string} inCorso.fill - Colore arancione per il cerchio (#ffbf00).
 * @property {number} inCorso.width - Dimensione del cerchio (20px).
 * @property {Object} spedito - Stile per lo stato "spedito".
 * @property {string} spedito.fill - Colore verde per il cerchio (#00c400).
 * @property {number} spedito.width - Dimensione del cerchio (20px).
 */
export const circleStyles = {
    nuovo: { fill: "#ff0000", width: 20 },
    inCorso: { fill: "#ffbf00", width: 20 },
    spedito: { fill: "#00c400", width: 20 },
};
