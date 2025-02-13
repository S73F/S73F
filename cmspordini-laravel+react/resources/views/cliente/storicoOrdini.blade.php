<!DOCTYPE html>
<html lang="it">

<!-- Beginning of head -->

<head>
    <!-- Meta informations -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="InfoGeneration" />
    <meta name="description" content="Pagina che visualizza lo storico ordini del cliente" />
    <title>CMSP - Storico ordini</title>

    @vite(['resources/css/reset.css','resources/css/header.css','resources/css/storicoOrdini.css','resources/css/footer.css', 'resources/js/storicoOrdini.js'])

</head>
<!-- Ending of head -->

<!-- Beginning of body -->

<body>
    @include('partials.header')

    <main>
        <h2 id="orders-history">Storico ordini</h2>

        <select id="selector" name="tempo">
            <option disabled selected>Lasso di tempo</option>
            <option class="select-element" value="30">30 giorni</option>
            <option class="select-element" value="60">60 giorni</option>
            <option disabled>---</option>
            <option class="select-element" value="tutto">Tutto</option>
        </select>
        <div class="table-container" />
    </main>


    @include('partials.footer')
</body>
<!-- Ending of body -->

</html>