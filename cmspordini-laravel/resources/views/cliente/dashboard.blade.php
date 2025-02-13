<!DOCTYPE html>
<html lang="it">

<!-- Beginning of head -->

<head>
    <!-- Meta informations -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="InfoGeneration" />
    <meta name="description" content="Dashboard cliente CMSP" />
    <title>Dashboard cliente</title>

    @vite(['resources/css/reset.css','resources/css/header.css','resources/css/clienteDashboard.css','resources/css/footer.css'])
    @toastifyCss
</head>
<!-- Ending of head -->

<!-- Beginning of body -->

<body>
    @include("partials.header")

    <main>
        <div id="main-container">
            <h2>Benvenuto {{session('nome')}}</h2>

            <div id="btns-container">
                <a href={{route('creazioneOrdine')}}>Nuovo ordine</a>
                <a href={{route('storicoOrdini')}}>Storico ordini</a>
            </div>
        </div>
    </main>

    @include('partials.footer')
    @toastifyJs
</body>
<!-- Ending of body -->

</html>