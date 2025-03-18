import React, { useRef } from "react";
import { useCreazioneCliente } from "../../Hooks/Components/Modals/useCreazioneCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";

export default function CreazioneCliente() {
    const modalRef = useRef(null);

    const { data, processing, handleChange, handleSubmit, handleDelete } =
        useCreazioneCliente({ modalRef });

    return (
        <Modal ref={modalRef}>
            <h3 id="modal-title">Creazione cliente</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-field">
                    <label htmlFor="ragione_sociale">Ragione Sociale</label>
                    <input
                        type="text"
                        name="ragione_sociale"
                        placeholder="Inserisci la ragione sociale"
                        required
                        value={data.ragione_sociale}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Inserisci il nome"
                        required
                        value={data.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="cognome">Cognome</label>
                    <input
                        type="text"
                        name="cognome"
                        placeholder="Inserisci il cognome"
                        required
                        value={data.cognome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="partita_iva">Partita IVA</label>
                    <input
                        type="text"
                        name="partitaIVA"
                        placeholder="Inserisci la partita IVA"
                        value={data.partitaIVA}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="indirizzo">Indirizzo</label>
                    <input
                        type="text"
                        name="indirizzo"
                        placeholder="Inserisci l'indirizzo"
                        required
                        value={data.indirizzo}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="citta">Città</label>
                    <input
                        type="text"
                        name="citta"
                        placeholder="Inserisci la città"
                        required
                        value={data.citta}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="cap">CAP</label>
                    <input
                        type="number"
                        name="cap"
                        placeholder="Inserisci il CAP"
                        required
                        value={data.cap}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="provincia">Provincia</label>
                    <input
                        type="text"
                        name="provincia"
                        placeholder="Inserisci la provincia"
                        required
                        value={data.provincia}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="emailcliente">Email</label>
                    <input
                        type="text"
                        name="emailcliente"
                        placeholder="Inserisci l'email"
                        required
                        value={data.emailcliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Inserisci lo username"
                        required
                        value={data.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="Inserisci la password"
                        required
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>

                <div id="btns-container">
                    <button
                        id="modal-submit-btn"
                        className="modal-form-btn"
                        type="submit"
                        disabled={processing}
                    >
                        Crea
                    </button>
                    <button
                        id="modal-reset-btn"
                        className="modal-form-btn"
                        type="reset"
                        onClick={handleDelete}
                    >
                        Cancella
                    </button>
                </div>
            </form>
        </Modal>
    );
}
