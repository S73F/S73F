document.addEventListener("DOMContentLoaded", function () {
    const btnLavoriInCorso = document.getElementById("btn-lavori-in-corso");
    const btnNuoviLavori = document.getElementById("btn-nuovi-lavori");
    const lavoriInCorsoContainer = document.getElementById(
        "lavori-in-corso-container"
    );
    const nuoviLavoriContainer = document.getElementById(
        "nuovi-lavori-container"
    );

    // Mostra "Lavori in corso" all'inizio
    btnLavoriInCorso.addEventListener("click", () => {
        lavoriInCorsoContainer.classList.add("active");
        lavoriInCorsoContainer.classList.remove("hidden");
        nuoviLavoriContainer.classList.add("hidden");
        nuoviLavoriContainer.classList.remove("active");
    });

    // Mostra "Nuovi lavori" al click
    btnNuoviLavori.addEventListener("click", () => {
        nuoviLavoriContainer.classList.add("active");
        nuoviLavoriContainer.classList.remove("hidden");
        lavoriInCorsoContainer.classList.add("hidden");
        lavoriInCorsoContainer.classList.remove("active");
    });
});
