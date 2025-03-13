<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>Ordine #{{ $ordine->numero }}</title>

    <style>
        body {
            font-family: "Helvetica", sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }

        .title {
            text-align: center;
            font-size: 22px;
            color: #444;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-top: 20px;
        }

        p {
            margin: 5px 0;
        }

        strong {
            color: #000;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .info-table th,
        .info-table td {
            padding: 10px;
            text-align: left;
            vertical-align: top;
            border: 1px solid #ddd;
        }

        .info-table th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        .info-table td {
            background-color: #fff;
        }

        .note,
        .note-int {
            background-color: #fdf8d3;
            border: 1px solid #f1e7a3;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
        }

        .last-modified {
            font-size: 11px;
            color: #666;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <h1 class="title">Scheda di lavorazione: Ordine n° {{ $ordine->numero }}</h1>
    <p><strong>Data ordine:</strong> {{ $ordine->data }}</p>

    <table class="info-table">
        <tr>
            <th>Ordinante</th>
            <th>Paziente</th>
        </tr>
        <tr>
            <td class="ordinante">
                <p>Prescrivente: <strong>{{ ucfirst($ordine->medicoOrdinante) }}</strong></p>
                <p>Ragione Sociale: <strong>{{ $ordine->cliente->ragione_sociale }}</strong></p>
                <p>Indirizzo: <strong>{{ $ordine->cliente->indirizzo }}, {{ $ordine->cliente->citta }} - {{ $ordine->cliente->provincia }}</strong></p>
            </td>
            <td class="paziente">
                <p>Nome: <strong>{{ ucfirst($ordine->PazienteNome) }}</strong></p>
                <p>Cognome: <strong>{{ ucfirst($ordine->PazienteCognome) }}</strong></p>
                <p>Indirizzo Spedizione: <strong>{{ $ordine->IndirizzoSpedizione }}</strong></p>
            </td>
        </tr>
    </table>

    <h3 class="section-title">Dettagli Lavorazione</h3>
    <p>Lavorazione: <strong>{{ $ordine->lavorazione }}</strong></p>
    <p>Colorazione: <strong>{{ $ordine->colore }}</strong></p>
    <p>Piattaforma Impianti: <strong>{{ $ordine->piattaforma }}</strong></p>
    <p>Data di Consegna: <strong>{{ $ordine->data_cons }} alle {{ $ordine->ora_cons }}</strong></p>

    @if($ordine->note)
    <h3 class="section-title">Note Cliente</h3>
    <p class="note">{{ $ordine->note }}</p>
    @endif

    @if ($ordine->utente_modifica!=="-")
    <h3 class="section-title">Ultima Modifica</h3>
    <p class="last-modified">L'ultima modifica è stata effettuata da: <strong>{{ $ordine->utente_modifica }}</strong></p>
    @endif

    @if ($ordine->note_int )
    <h3 class="section-title">Note Interne</h3>
    <p class="note-int">{{ $ordine->note_int }}</p>
    @endif
</body>

</html>