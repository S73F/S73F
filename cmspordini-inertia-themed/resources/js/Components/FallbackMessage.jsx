import React from "react";
import { Typography } from "@mui/material";

/**
 * Componente che visualizza un messaggio di fallback personalizzato quando non ci sono elementi da mostrare per una determinata categoria
 * (es: ordini, clienti, prodotti).
 *
 * Il messaggio varia in base al genere (maschile, femminile o neutro) e all'elemento (come "ordine", "cliente", etc.).
 *
 * @param {Object} props - Proprietà del componente.
 * @param {string} props.item - L'elemento per cui non sono stati trovati risultati. Es: "ordine", "cliente", "prodotto".
 * @param {string} [props.gender="neutral"] - Il genere da utilizzare per personalizzare il messaggio. Es: "male"="Nessuno {item} trovato", "female"="Nessuna {item} trovata", DEFAULT: "neutral"="Nessun {item} trovato".
 *
 * @returns {JSX.Element} Un messaggio di fallback personalizzato che informa l'utente che non sono stati trovati risultati per l'elemento richiesto.
 */
export const FallbackMessage = ({ item, gender = "neutral" }) => {
    const messages = {
        male: `Nessuno ${item} trovato`,
        female: `Nessuna ${item} trovata`,
        neutral: `Nessun ${item} trovato`,
    };

    return (
        <Typography
            variant="h5"
            component={"p"}
            sx={{ mt: 4, textAlign: "center" }}
        >
            {messages[gender] || messages.neutral}
        </Typography>
    );
};
