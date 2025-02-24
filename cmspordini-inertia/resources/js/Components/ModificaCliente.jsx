import React, { useEffect, useState } from "react";
import "../../css/creazioneCliente.css";
import { useForm } from "@inertiajs/react";

export default function ModificaCliente({ cliente, onClose }) {
    const { data, setData, patch, processing } = useForm({
        ragione_sociale: "",
        nome: "",
        cognome: "",
        partitaIVA: "",
        indirizzo: "",
        citta: "",
        cap: "",
        provincia: "",
        emailcliente: "",
        username: "",
        password: "",
    });

    const [placeholderData, setPlaceholderData] = useState({
        ragione_sociale: cliente.ragione_sociale || "",
        nome: cliente.nome || "",
        cognome: cliente.cognome || "",
        partitaIVA: cliente.partitaIVA || "",
        indirizzo: cliente.indirizzo || "",
        citta: cliente.citta || "",
        cap: cliente.cap || "",
        provincia: cliente.provincia || "",
        emailcliente: cliente.emailcliente || "",
        username: cliente.username || "",
        password: "",
    });

    useEffect(() => {
        if (cliente) {
            setPlaceholderData({
                ragione_sociale: cliente.ragione_sociale,
                nome: cliente.nome,
                cognome: cliente.cognome,
                partitaIVA: cliente.partitaIVA,
                indirizzo: cliente.indirizzo,
                citta: cliente.citta,
                cap: cliente.cap,
                provincia: cliente.provincia,
                emailcliente: cliente.emailcliente,
                username: cliente.username,
                password: "",
            });
        }
    }, [cliente]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/operatore/gestione-clienti/${cliente.IDcliente}`, {
            onSuccess: onClose,
            onError: () => {
                console.log("Errore durante la modifica del cliente");
            },
        });
    };

    return (
        <div id="creazione-cliente-modal-overlay" onClick={onClose}>
            <div
                id="creazione-cliente-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div id="modal-close--container">
                    <button id="modal-close" onClick={onClose}>
                        X
                    </button>
                </div>
                <h2 id="creazione-cliente-title">Modifica cliente</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="ragione_sociale">Ragione Sociale</label>
                        <input
                            type="text"
                            name="ragione_sociale"
                            placeholder={placeholderData.ragione_sociale}
                            value={data.ragione_sociale}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder={placeholderData.nome}
                            value={data.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cognome">Cognome</label>
                        <input
                            type="text"
                            name="cognome"
                            placeholder={placeholderData.cognome}
                            value={data.cognome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="partita_iva">Partita IVA</label>
                        <input
                            type="text"
                            name="partitaIVA"
                            placeholder={placeholderData.partitaIVA}
                            value={data.partitaIVA}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="indirizzo">Indirizzo</label>
                        <input
                            type="text"
                            name="indirizzo"
                            placeholder={placeholderData.indirizzo}
                            value={data.indirizzo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="citta">Città</label>
                        <input
                            type="text"
                            name="citta"
                            placeholder={placeholderData.citta}
                            value={data.citta}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="cap">CAP</label>
                        <input
                            type="number"
                            name="cap"
                            placeholder={placeholderData.cap}
                            value={data.cap}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="provincia">Provincia</label>
                        <input
                            type="text"
                            name="provincia"
                            placeholder={placeholderData.provincia}
                            value={data.provincia}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="emailcliente">Email</label>
                        <input
                            type="text"
                            name="emailcliente"
                            placeholder={placeholderData.emailcliente}
                            value={data.emailcliente}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder={placeholderData.username}
                            value={data.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        id="cliente-submit-btn"
                        type="submit"
                        disabled={processing}
                    >
                        Crea
                    </button>
                </form>
            </div>
        </div>
    );
}
