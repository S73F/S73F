<!DOCTYPE HTML>
<html lang="it">

<head>
    <title>Ordini CMSP - Login</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="InfoGeneration">
    @vite(['resources/css/reset.css','resources/css/header.css','resources/css/login.css','resources/css/footer.css'])
    @toastifyCss
</head>

<body>
    @include("partials.header")

    <!-- Main -->
    <main>
        <!-- Post -->
        <div id="login-container">
            <img src={{asset('assets/images/ODONTOTECNICA-LOGO.svg')}} />

            <form action={{route("login")}} method="post">
                @csrf

                <input id="username" name="username" placeholder="username" type="text" required value={{old('username')}}>
                <input id="password" name="password" placeholder="password" type="password" required>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; <a target="_blank" href="http://www.infogeneration.it">INFOGENERATION</a></p>
        <footer />
    </footer>

    @toastifyJs
</body>

</html>