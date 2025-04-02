/**
 * Stile per i pulsanti del form, con dimensioni adattabili in base alla viewport.
 *
 * @constant {Object} formBtnStyle
 * @property {Object} width - Larghezza dinamica basata sulla dimensione dello schermo.
 * @property {string} width.xs - Larghezza al 100% su schermi extra-small (mobile).
 * @property {number} width.sm - Larghezza di 100px su schermi small.
 * @property {number} width.md - Larghezza di 200px su schermi medium e superiori.
 * @property {Object} height - Altezza adattabile alla viewport.
 * @property {number} height.xs - Altezza di 50px su schermi extra-small.
 * @property {number} height.sm - Altezza di 70px su schermi small e superiori.
 */
export const formBtnStyle = {
    width: { xs: "100%", sm: 100, md: 200 },
    height: { xs: 50, sm: 70 },
};

/**
 * Stile per il contenitore dei pulsanti del form, con layout flessibile e spaziatura reattiva.
 *
 * @constant {Object} formBtnStack
 * @property {string} width - Larghezza al 100%.
 * @property {string} display - Layout flessibile tramite flexbox.
 * @property {string} flexDirection - Disposizione degli elementi in riga.
 * @property {Object} gap - Spaziatura tra gli elementi in base alla viewport.
 * @property {number} gap.xs - Spaziatura di 3 su schermi extra-small.
 * @property {number} gap.md - Spaziatura di 5 su schermi medium e superiori.
 * @property {string} justifyContent - Centra gli elementi orizzontalmente.
 * @property {string} flexWrap - Permette il wrapping dei pulsanti su schermi più piccoli.
 * @property {number} mt - Margine superiore di 4.
 */
export const formBtnStack = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: { xs: 3, md: 5 },
    justifyContent: "center",
    flexWrap: "wrap",
    mt: 4,
};

/**
 * Stile per il promemoria dei file da caricare, con bordo tratteggiato e layout centrato.
 *
 * @constant {Object} formFileReminder
 * @property {string} border - Bordo tratteggiato di 2px con colore principale di Material-UI (#1976d2).
 * @property {string} margin - Centra il box orizzontalmente.
 * @property {string} display - Layout flessibile tramite flexbox.
 * @property {string} flexDirection - Disposizione degli elementi in colonna.
 * @property {string} alignItems - Centra gli elementi orizzontalmente.
 * @property {string} justifyContent - Centra gli elementi verticalmente.
 * @property {number} borderRadius - Angoli arrotondati con raggio di 2.
 * @property {number} p - Padding di 3 per una migliore leggibilità.
 * @property {string} textAlign - Allinea il testo al centro.
 * @property {Object} width - Larghezza dinamica in base alla viewport.
 * @property {string} width.xs - Larghezza al 100% su schermi extra-small.
 * @property {string} width.md - Larghezza al 50% su schermi medium e superiori.
 */
export const formFileReminder = {
    border: "2px dashed #1976d2",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    p: 3,
    textAlign: "center",
    width: { xs: "100%", md: "50%" },
};
