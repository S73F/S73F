<!DOCTYPE html>
<html lang="it">

<!-- Beginning of head -->

<head>
    <!-- Meta informations -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="InfoGeneration" />
    <meta name="description" content="Dashboard operatore CMSP" />
    <title>Dashboard operatore</title>

    @vite(['resources/css/reset.css','resources/css/header.css', 'resources/css/operatoreDashboard.css','resources/css/footer.css','resources/css/lavori.css','resources/css/pagination-btns.css','resources/js/lavori.js'])
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
                <a href={{route('creazioneOrdine')}}>Gestione clienti</a>
                <a href={{route('storicoOrdini')}}>Ordini</a>
                <a id="btn-nuovi-lavori">Nuovi lavori</a>
                <a id="btn-lavori-in-corso">Lavori in corso</a>
            </div>
        </div>

        <div class="table-container">
            <div id="lavori-in-corso-container" class="active">
                @livewire('lavori-in-corso-table')
            </div>
            <div id="nuovi-lavori-container" class="hidden">
                @livewire('lavori-nuovi-table')
            </div>
        </div>
    </main>

    @include("partials.footer")

    @toastifyJs
</body>
<!-- Ending of body -->

</html>