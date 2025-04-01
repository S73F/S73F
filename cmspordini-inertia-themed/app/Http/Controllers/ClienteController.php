<?php

namespace App\Http\Controllers;

use App\Models\Ordine;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Mostra la dashboard del cliente.
     *
     * @return \Inertia\Response
     */
    public function showDashboard()
    {
        return Inertia::render("Cliente/Dashboard");
    }

    /**
     * Mostra lo storico degli ordini del cliente.
     *
     * @param string|null $tempo - Il periodo di tempo per cui visualizzare gli ordini (opzionale, inizializzato a null).
     * @return \Inertia\Response
     */
    public function getStoricoOrdini($tempo = null)
    {
        $ordini = [];

        // Esegue il blocco di codice solo se è stato passato il lasso di tempo nell'url
        if ($tempo !== null) {

            $idCliente = Auth::guard('cliente')->user()->IDcliente;

            // Inizializza la query per recuperare gli ordini del cliente autenticato
            $query = Ordine::where('IDcliente', $idCliente);

            // Se il parametro tempo non è "tutto", filtra gli ordini per data
            if ($tempo !== "tutto") {
                $query->whereBetween("data", [now()->subDays($tempo), now()]);
            }

            // Esegue la query e seleziona le colonne necessarie
            $ordini = $query->select(
                'IDordine',
                'data',
                'medicoOrdinante',
                'PazienteNome',
                'PazienteCognome',
                'IndirizzoSpedizione',
                'data_inizioLavorazione',
                'stato',
                'data_spedizione',
                'file_fin'
            )
                ->orderBy('data', "desc") // Ordina gli ordini per data decrescente
                ->get(); // Recupera i risultati dalla query

            // Passa gli ordini alla vista
            return Inertia::render('Cliente/StoricoOrdini', ['ordini' => $ordini]);
        } else {
            // Se non è stato passato alcun parametro tempo, renderizza la vista senza ordini
            return Inertia::render('Cliente/StoricoOrdini');
        }
    }

    /**
     * Mostra la pagina per la creazione di un nuovo ordine.
     *
     * @return \Inertia\Response
     */
    public function showCreazioneOrdine()
    {
        return Inertia::render("Cliente/CreazioneOrdine");
    }
}
