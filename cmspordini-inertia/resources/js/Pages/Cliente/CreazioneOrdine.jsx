import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "../../Layouts/Layout";
import "../../../css/creazioneOrdine.css";

export default function CreazioneOrdine() {
    const { data, setData, post, processing } = useForm({
        medico_ordinante: "",
        paziente_nome: "",
        paziente_cognome: "",
        indirizzo_spedizione: "",
        lavorazione: "",
        colore: "",
        data_cons: "",
        ora_cons: "",
        piattaforma: "",
        note: "",
        userfile: null,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData("userfile", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/cliente/ordini/creazione", {
            forceFormData: true, // Indica che c'è un file
        });
    };

    return (
        <div id="upload-form-container">
            <h2>Spedisci nuovo ordine</h2>
            <form
                id="form-ordine"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div class="form-field">
                    <label htmlFor="medico_ordinante">Medico ordinante</label>
                    <input
                        type="text"
                        name="medico_ordinante"
                        placeholder="Inserisci il medico ordinante"
                        required
                        value={data.medico_ordinante}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="paziente_nome">Nome paziente</label>
                    <input
                        type="text"
                        name="paziente_nome"
                        placeholder="Inserisci il nome del paziente"
                        required
                        value={data.paziente_nome}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="paziente_cognome">Cognome paziente</label>
                    <input
                        type="text"
                        name="paziente_cognome"
                        placeholder="Inserisci il cognome del paziente"
                        required
                        value={data.paziente_cognome}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="indirizzo_spedizione">
                        Indirizzo spedizione
                    </label>
                    <input
                        type="text"
                        name="indirizzo_spedizione"
                        placeholder="Inserisci l'indirizzo di spedizione"
                        required
                        value={data.indirizzo_spedizione}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="lavorazione">Lavorazione</label>
                    <input
                        type="text"
                        name="lavorazione"
                        placeholder="Descrivi la lavorazione ed elementi interessati"
                        value={data.lavorazione}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="colore">Colore</label>
                    <input
                        type="text"
                        name="colore"
                        placeholder="Inserisci il colore"
                        required
                        value={data.colore}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="data_cons">Data consegna</label>
                    <input
                        type="date"
                        name="data_cons"
                        required
                        value={data.data_cons}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field">
                    <label htmlFor="ora_cons">Ora consegna</label>
                    <input
                        type="time"
                        name="ora_cons"
                        required
                        value={data.ora_cons}
                        onChange={handleChange}
                    />
                </div>

                <div class="form-field-textarea">
                    <label htmlFor="piattaforma">Piattaforma impianti</label>
                    <textarea
                        name="piattaforma"
                        placeholder="Inserisci la piattaforma impianti"
                        value={data.piattaforma}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div class="form-field-textarea">
                    <label htmlFor="note">Note</label>
                    <textarea
                        name="note"
                        placeholder="Inserisci eventuali note"
                        value={data.note}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div class="form-field">
                    <label id="send-file-text" htmlFor="userfile">
                        File allegato
                    </label>
                    <input
                        id="userfile"
                        name="userfile"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                <button id="submit-btn" type="submit" disabled={processing}>
                    Invia ordine
                </button>
            </form>
        </div>
    );
}

CreazioneOrdine.layout = (page) => <Layout>{page}</Layout>;
