import React from "react";
import OrdiniClienteTable from "../../Components/Tables/OrdiniClienteTable";
import { useOrdiniClienti } from "../../Hooks/Operatore/useOrdiniClienti";
import { MenuItem, Typography } from "@mui/material";
import OperatoreLayout from "../../Layouts/OperatoreLayout";
import { Content } from "../../Components/Content";
import { DataTable } from "../../Components/Tables/DataTable";

/**
 * Componente per la gestione e visualizzazione degli ordini dei clienti.
 * Permette di selezionare un cliente e visualizzare i suoi ordini in una tabella.
 *
 * @param {Object} props - Proprietà del componente.
 * @param {Array} props.clienti - Lista dei clienti da mostrare nel selettore.
 * @param {Array} props.ordini - Lista degli ordini da visualizzare nella tabella.
 * @returns {JSX.Element} La UI per la gestione degli ordini clienti.
 */
export default function OrdiniClienti({ clienti, ordini }) {
    // Custom hook per gestire il cambio di selezione del cliente
    const { handleChange } = useOrdiniClienti();

    return (
        <Content.Container>
            <Content.Layout title={"Ordini clienti"}>
                {/* Selettore per filtrare gli ordini in base al cliente */}
                <DataTable.Selector
                    inputLabel={"Cliente"}
                    handleChange={handleChange}
                >
                    {clienti.map((cliente) => (
                        <MenuItem
                            key={cliente.IDcliente} // Chiave univoca per React
                            value={cliente.IDcliente} // Valore da passare all'handler
                        >
                            {cliente.ragione_sociale} {/* Nome del cliente */}
                        </MenuItem>
                    ))}
                </DataTable.Selector>
            </Content.Layout>

            {/* Mostra la tabella solo se ci sono ordini disponibili */}
            {ordini?.length > 0 && <OrdiniClienteTable ordini={ordini} />}

            {/* Messaggio di fallback nel caso non ci siano ordini */}
            {ordini?.length === 0 && (
                <Typography
                    variant="h5"
                    component={"p"}
                    sx={{ mt: 4, textAlign: "center" }}
                >
                    Nessun ordine trovato
                </Typography>
            )}
        </Content.Container>
    );
}

/**
 * Imposta il layout specifico per la gestione degli ordini dei clienti, utilizzando il layout OperatoreLayout.
 *
 * @param {JSX.Element} page - Il contenuto della pagina da inserire nel layout.
 * @returns {JSX.Element} La pagina avvolta dal layout OperatoreLayout.
 */
OrdiniClienti.layout = (page) => <OperatoreLayout>{page}</OperatoreLayout>;
