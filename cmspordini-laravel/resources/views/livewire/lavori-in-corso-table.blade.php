<div>
    <h3 class="tipo-lavori">Lavori in Corso</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Richiedente
                    <hr>Ragione Sociale
                </th>
                <th>Paziente</th>
                <th>Data ordine</th>
                <th>Operatore</th>
                <th>Inizio lavorazione</th>
                <th>Allegati</th>
                <th>Azioni</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($lavori as $lavoro)
            <tr>
                <td id="richiedente">{{ $lavoro->medicoOrdinante }}
                    <hr /><strong>{{ $lavoro->cliente->ragione_sociale }}</strong>
                </td>
                <td>
                    <a>{{ $lavoro->PazienteCognome }} {{ $lavoro->PazienteNome }}</a><br />
                    Ultima mod.: {{ $lavoro->note_ulti_mod ?? 'Nessuna' }}
                    <hr />
                    <strong><a href="mailto:{{ $lavoro->cliente->emailcliente }}">{{ $lavoro->cliente->emailcliente }}</a></strong>
                </td>
                <td id="data-ordine">{{ $lavoro->data}}</td>
                <td>{{ $lavoro->operatore->nome ?? '' }} {{ $lavoro->operatore->cognome ?? '' }}
                    <hr><a>Carica lavorazione</a>
                </td>
                <td id="inizio-lavorazione">{{ $lavoro->data_inizioLavorazione ? $lavoro->data_inizioLavorazione : '' }}</td>
                <td>
                    <a>Sorgente</a>
                    <hr />
                    <a>Pdf</a>

                </td>
                <td><a>Spedito</a></td>
            </tr>
            @empty
            <tr>
                <td colspan="7">Nessun lavoro trovato.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <div class="pagination-links">
        {{ $lavori->links() }}
    </div>
</div>