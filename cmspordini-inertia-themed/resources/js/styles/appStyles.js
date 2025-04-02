/**
 * Stile per un contenitore flessibile centrato, ideale per layout principali o sezioni di pagine.
 *
 * @constant {Object} contentContainer
 * @property {string} width - Larghezza al 100%.
 * @property {string} display - Utilizza il display "flex" per una disposizione flessibile.
 * @property {number} flex - Occupa tutto lo spazio disponibile all'interno del flex container.
 * @property {string} flexDirection - Disposizione degli elementi in colonna.
 * @property {string} alignItems - Centra gli elementi orizzontalmente.
 * @property {string} justifyContent - Centra gli elementi verticalmente.
 * @property {string} textAlign - Allinea il testo al centro.
 * @property {number} px - Padding orizzontale (4).
 * @property {number} py - Padding verticale (6).
 */
export const contentContainer = {
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    px: 4,
    py: 6,
};

/**
 * Stile personalizzato per i badge di Material-UI, applicato alla classe `.MuiBadge-badge`.
 *
 * @constant {Object} badgeStyle
 * @property {Object} "& .MuiBadge-badge" - Stili interni per il badge.
 * @property {number} "& .MuiBadge-badge.width" - Larghezza del badge (27px).
 * @property {number} "& .MuiBadge-badge.height" - Altezza del badge (27px).
 * @property {string} "& .MuiBadge-badge.border" - Bordo bianco di 2px per migliorare il contrasto.
 * @property {string} "& .MuiBadge-badge.boxShadow" - Ombra per evidenziare il badge.
 * @property {string} "& .MuiBadge-badge.userSelect" - Impedisce la selezione del badge (UX migliorata).
 * @property {number} "& .MuiBadge-badge.fontSize" - Dimensione del font (12px).
 * @property {string} "& .MuiBadge-badge.fontWeight" - Spessore del font (600, semi-bold).
 */
export const badgeStyle = {
    "& .MuiBadge-badge": {
        width: 27,
        height: 27,
        border: "2px solid #fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        userSelect: "none",
        fontSize: 12,
        fontWeight: "600",
    },
};

/**
 * Stile per pulsanti personalizzati.
 *
 * @constant {Object} buttonStyles
 * @property {string} fontWeight - Peso del font in grassetto.
 * @property {number} px - Padding orizzontale (3).
 * @property {number} py - Padding verticale (1).
 * @property {number} width - Larghezza fissa del pulsante (170px).
 * @property {string} textAlign - Allinea il testo a sinistra.
 */
export const buttonStyles = {
    fontWeight: "bold",
    px: 3,
    py: 1,
    width: 170,
    textAlign: "left",
};

/**
 * Stile per il pulsante di creazione cliente.
 *
 * @constant {Object} creazioneClienteBtn
 * @property {string} display - Imposta il layout come flexbox.
 * @property {string} flexDirection - Dispone gli elementi in colonna.
 * @property {string} alignItems - Centra gli elementi orizzontalmente.
 * @property {string} width - Larghezza fissa di 100px.
 * @property {string} height - Altezza fissa di 40px.
 * @property {number} mt - Margine superiore negativo (-2) per allineamento visivo.
 * @property {number} mb - Margine inferiore (6) per spaziatura.
 * @property {string} textDecoration - Rimuove la sottolineatura dal link.
 * @property {Object} "&:hover" - Stile per l'hover del pulsante.
 * @property {string} "&:hover.opacity" - Riduce l'opacità al 80% quando il mouse passa sopra.
 */
export const creazioneClienteBtn = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100px",
    height: "40px",
    mt: -2,
    mb: 6,
    textDecoration: "none",
    "&:hover": {
        opacity: "0.8",
    },
};
