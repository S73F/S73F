const selector = document.getElementById("selector");

async function getStorico() {
    const selectedTime = selector.value;

    const response = await fetch(
        `/clienteDashboard/ordini/storico/tempo?q=${selectedTime}`
    );

    const data = await response.json();

    console.log(data);
    return data;
}

async function createTable() {
    const tableContainer = document.querySelector(".table-container");

    tableContainer.replaceChildren();

    const table = document.createElement("table");
    const tHead = document.createElement("thead");
    const tHeadRow = document.createElement("tr");
    const thDataOrdine = document.createElement("th");
    const thRichiedente = document.createElement("th");
    const thPDF = document.createElement("th");
    const thPazNome = document.createElement("th");
    const thPazCognome = document.createElement("th");
    const thIndirizzo = document.createElement("th");
    const thInizioLavoro = document.createElement("th");
    const thStatoLavoro = document.createElement("th");
    const thSpedizione = document.createElement("th");
    const tBody = document.createElement("tbody");

    thDataOrdine.textContent = "Data ordine";
    thRichiedente.textContent = "Richiedente";
    thPDF.textContent = "PDF";
    thPazNome.textContent = "Paz. nome";
    thPazCognome.textContent = "Paz. cognome";
    thIndirizzo.textContent = "Indirizzo";
    thInizioLavoro.textContent = "Inizio lavoro";
    thStatoLavoro.textContent = "Stato lavoro";
    thSpedizione.textContent = "Spedizione";

    tableContainer.appendChild(table);
    table.appendChild(tHead);
    table.appendChild(tBody);
    tHead.appendChild(tHeadRow);
    tHeadRow.appendChild(thDataOrdine);
    tHeadRow.appendChild(thRichiedente);
    tHeadRow.appendChild(thPDF);
    tHeadRow.appendChild(thPazNome);
    tHeadRow.appendChild(thPazCognome);
    tHeadRow.appendChild(thIndirizzo);
    tHeadRow.appendChild(thInizioLavoro);
    tHeadRow.appendChild(thStatoLavoro);
    tHeadRow.appendChild(thSpedizione);

    await populateTable(tBody);
}

async function populateTable(tBody) {
    const data = await getStorico();

    data.forEach((ordine) => {
        const tr = document.createElement("tr");
        const tdDataOrdine = document.createElement("td");
        const tdRichiedente = document.createElement("td");
        const tdPDF = document.createElement("td");
        const tdPazNome = document.createElement("td");
        const tdPazCognome = document.createElement("td");
        const tdIndirizzo = document.createElement("td");
        const tdInizioLavoro = document.createElement("td");
        const tdStatoLavoro = document.createElement("td");
        const tdSpedizione = document.createElement("td");

        tdDataOrdine.textContent = ordine.data;
        tdRichiedente.textContent = ordine.medicoOrdinante;

        const pdfAnchor = document.createElement("a");
        pdfAnchor.href = `/clienteDashboard/ordini/${ordine.IDordine}`;
        pdfAnchor.target = "_blank";
        pdfAnchor.textContent = "Visualizza PDF";
        tdPDF.appendChild(pdfAnchor);

        tdPazNome.textContent = ordine.PazienteNome;
        tdPazCognome.textContent = ordine.PazienteCognome;
        tdIndirizzo.textContent = ordine.IndirizzoSpedizione;

        if (ordine.data_inizioLavorazione === null) {
            tdInizioLavoro.textContent = "-";
        } else {
            tdInizioLavoro.textContent = ordine.data_inizioLavorazione;
        }

        if (ordine.stato === 0) {
            tdStatoLavoro.textContent = "Nuovo";
        } else if (ordine.stato === 1) {
            tdStatoLavoro.textContent = "In lavorazione";
        } else {
            tdStatoLavoro.textContent = "Spedito";
        }

        if (ordine.data_spedizione === null) {
            tdSpedizione.textContent = "-";
        } else {
            tdSpedizione.textContent = ordine.data_spedizione;
        }

        tBody.appendChild(tr);
        tr.appendChild(tdDataOrdine);
        tr.appendChild(tdRichiedente);
        tr.appendChild(tdPDF);
        tr.appendChild(tdPazNome);
        tr.appendChild(tdPazCognome);
        tr.appendChild(tdIndirizzo);
        tr.appendChild(tdInizioLavoro);
        tr.appendChild(tdStatoLavoro);
        tr.appendChild(tdSpedizione);
    });
}

selector.addEventListener("change", createTable);
