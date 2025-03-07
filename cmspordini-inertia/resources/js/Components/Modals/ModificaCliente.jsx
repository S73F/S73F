import React, { useRef } from "react";
import { useModificaCliente } from "../../Hooks/Components/Modals/useModificaCliente";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/modal.css";

export default function ModificaCliente({ cliente }) {
    const modalRef = useRef(null);

    const {
        data,
        processing,
        placeholderData,
        handleChange,
        handleSubmit,
        handleDelete,
        closeModal,
    } = useModificaCliente({ cliente, modalRef });

    return (
        <Modal ref={modalRef}>
            <h3 id="modal-title">Modifica cliente</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="ragione_sociale">Ragione Sociale</label>
                    <input
                        type="text"
                        name="ragione_sociale"
                        value={data.ragione_sociale}
                        placeholder={placeholderData.ragione_sociale}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={data.nome}
                        placeholder={placeholderData.nome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="cognome">Cognome</label>
                    <input
                        type="text"
                        name="cognome"
                        value={data.cognome}
                        placeholder={placeholderData.cognome}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="partita_iva">Partita IVA</label>
                    <input
                        type="text"
                        name="partitaIVA"
                        value={data.partitaIVA}
                        placeholder={placeholderData.partitaIVA}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="indirizzo">Indirizzo</label>
                    <input
                        type="text"
                        name="indirizzo"
                        value={data.indirizzo}
                        placeholder={placeholderData.indirizzo}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="citta">Città</label>
                    <input
                        type="text"
                        name="citta"
                        value={data.citta}
                        placeholder={placeholderData.citta}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="cap">CAP</label>
                    <input
                        type="number"
                        name="cap"
                        value={data.cap}
                        placeholder={placeholderData.cap}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="provincia">Provincia</label>
                    <input
                        type="text"
                        name="provincia"
                        value={data.provincia}
                        placeholder={placeholderData.provincia}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="emailcliente">Email</label>
                    <input
                        type="text"
                        name="emailcliente"
                        value={data.emailcliente}
                        placeholder={placeholderData.emailcliente}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        placeholder={placeholderData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={data.password}
                        placeholder={placeholderData.password}
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
                        Modifica
                    </button>
                    <button
                        id="modal-reset-btn"
                        className="modal-form-btn"
                        type="reset"
                        onClick={handleDelete}
                    >
                        Cancella
                    </button>
                    <button
                        id="modal-close-btn"
                        className="modal-form-btn"
                        type="button"
                        onClick={closeModal}
                    >
                        Chiudi
                    </button>
                </div>
            </form>
        </Modal>
    );
}
