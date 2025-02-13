<!-- Header -->
<header>
    <h1><a id="header-logo" href="/">ORDINI GruppoCMSP</a></h1>

    @auth('cliente')
    <form action={{route("logout")}} method="post">
        @csrf
        <button class="logout-btn" type="submit">
            <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <!-- Porta -->
                <rect x="3" y="4" width="12" height="16" rx="1" />
                <!-- Freccia -->
                <path d="M15 12h6" /> <!-- Linea orizzontale della freccia -->
                <path d="M18 9l3 3-3 3" /> <!-- Punta della freccia -->
            </svg>
        </button>
    </form>
    @elseauth('operatore')
    <form action={{route("logout")}} method="post">
        @csrf
        <button class="logout-btn" type="submit">
            <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <!-- Porta -->
                <rect x="3" y="4" width="12" height="16" rx="1" />
                <!-- Freccia -->
                <path d="M15 12h6" /> <!-- Linea orizzontale della freccia -->
                <path d="M18 9l3 3-3 3" /> <!-- Punta della freccia -->
            </svg>
        </button>
    </form>
    @endauth
</header>