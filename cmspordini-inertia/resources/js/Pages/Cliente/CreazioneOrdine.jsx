import React, { useState } from "react";
import Layout from "../../Layouts/Layout";
import "../../../css/creazioneOrdine.css";
import { useCreazioneOrdine } from "../../Hooks/Cliente/useCreazioneOrdine";
import Tiptap from "../../Components/Tiptap";

export default function CreazioneOrdine() {
    const {
        data,
        setData,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleEditorContentSave,
        processing,
    } = useCreazioneOrdine();

    return (
        <div id="upload-form-container">
            <h2 id="creazione-ordine-title">Spedisci nuovo ordine</h2>
            <form
                id="form-ordine"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="form-field">
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

                <div className="form-field">
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

                <div className="form-field">
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

                <div className="form-field">
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

                <Tiptap.Container>
                    <Tiptap.Title title={"Lavorazione"} />
                    <Tiptap.Editor
                        onEditorContentSave={handleEditorContentSave}
                        tipo={"lavorazione"}
                    />
                </Tiptap.Container>

                <div className="field-group">
                    <div className="form-field">
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

                    <div className="form-field">
                        <label htmlFor="data_cons">Data consegna</label>
                        <input
                            type="date"
                            name="data_cons"
                            required
                            value={data.data_cons}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="ora_cons">Ora consegna</label>
                        <input
                            type="time"
                            name="ora_cons"
                            required
                            value={data.ora_cons}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="field-group">
                    <Tiptap.HalfContainer>
                        <Tiptap.Title title={"Piattaforma impianti"} />
                        <Tiptap.Editor
                            onEditorContentSave={handleEditorContentSave}
                            tipo={"piattaforma"}
                        />
                    </Tiptap.HalfContainer>

                    <Tiptap.HalfContainer>
                        <Tiptap.Title title={"Note"} />
                        <Tiptap.Editor
                            onEditorContentSave={handleEditorContentSave}
                            tipo={"note"}
                        />
                    </Tiptap.HalfContainer>
                </div>

                <div className="form-field">
                    <label id="send-file-text" htmlFor="userfile">
                        File allegato
                    </label>
                    <input
                        id="userfile"
                        name="userfile"
                        type="file"
                        required
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
