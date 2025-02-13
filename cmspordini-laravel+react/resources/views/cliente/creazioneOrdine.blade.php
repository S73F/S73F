<!DOCTYPE html>
<html lang="it">

<!-- Beginning of head -->

<head>
    <!-- Meta informations -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="InfoGeneration" />
    <meta name="description" content="Pagina di creazione di un nuovo ordine" />
    <title>Creazione ordine</title>

    @vite(['resources/css/reset.css','resources/css/header.css','resources/css/creazioneOrdine.css','resources/css/footer.css'])
    @toastifyCss
</head>
<!-- Ending of head -->

<!-- Beginning of body -->

<body>
    @include('partials.header')

    <!-- Main -->
    <main>
        <!-- Post -->
        <div id="upload-form-container">
            <h2>Spedisci nuovo ordine</h2>
            <form id="form-ordine" enctype="multipart/form-data" action="{{ route('creazioneOrdine') }}" method="POST">
                @csrf

                <label for="medico_ordinante">Medico ordinante</label>
                <input type="text" id="medico_ordinante" name="medico_ordinante" placeholder="Inserisci il medico ordinante" required value="{{ old('medico_ordinante') }}">

                <label for="paziente_nome">Nome paziente</label>
                <input type="text" id="paziente_nome" name="paziente_nome" placeholder="Inserisci il nome del paziente" required value="{{ old('paziente_nome') }}">

                <label for="paziente_cognome">Cognome paziente</label>
                <input type="text" id="paziente_cognome" name="paziente_cognome" placeholder="Inserisci il cognome del paziente" required value="{{ old('paziente_cognome') }}">

                <label for="indirizzo_spedizione">Indirizzo spedizione</label>
                <input type="text" id="indirizzo_spedizione" name="indirizzo_spedizione" placeholder="Inserisci l'indirizzo di spedizione" required value="{{ old('indirizzo_spedizione') }}">

                <label for="lavorazione">Lavorazione</label>
                <input type="text" id="lavorazione" name="lavorazione" placeholder="Descrivi la lavorazione ed elementi interessati" value="{{ old('lavorazione') }}">

                <label for="colore">Colore</label>
                <input type="text" id="colore" name="colore" placeholder="Inserisci il colore" required value="{{ old('colore') }}">

                <label for="data_cons">Data consegna</label>
                <input type="date" id="data_cons" name="data_cons" required value="{{ old('data_cons') }}">

                <label for="ora_cons">Ora consegna</label>
                <input type="time" id="ora_cons" name="ora_cons" required value="{{ old('ora_cons') }}">

                <label for="piattaforma">Piattaforma impianti</label>
                <textarea id="piattaforma" name="piattaforma" placeholder="Inserisci la piattaforma impianti">{{ old('piattaforma') }}</textarea>

                <label for="note">Note</label>
                <textarea id="note" name="note" placeholder="Inserisci eventuali note">{{ old('note') }}</textarea>

                <label id="send-file-text" for="userfile">File allegato</label>
                <input id="userfile" name="userfile" type="file">

                <button id="submit-btn" type="submit">Invia ordine</button>
            </form>

        </div>
    </main>

    @include('partials.footer')
    @toastifyJs
</body>
<!-- Ending of body -->

</html>