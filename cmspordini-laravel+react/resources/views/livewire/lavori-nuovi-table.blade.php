<div>
    <h3 class="tipo-lavori">Lavori Nuovi</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Richiedente
                    <hr>Ragione Sociale
                </th>
                <th>Paziente</th>
                <th>Data ordine</th>
                <th>Allegati</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($lavori as $lavoro)
            <tr>
                <td>{{ $lavoro->medicoOrdinante }}
                    <hr /><strong>{{ $lavoro->cliente->ragione_sociale }}</strong>
                </td>
                <td><a>{{ $lavoro->PazienteCognome }} {{ $lavoro->PazienteNome }}</a></td>
                <td>{{ $lavoro->data}}</td>
                <td>
                    <a>File</a><br />
                    <a>Pdf</a>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="4">Nessun lavoro trovato.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <div class="pagination-links">
        {{ $lavori->links() }}
    </div>
</div>