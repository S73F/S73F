import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useEliminazioneCliente } from "../../Hooks/Components/Modals/useEliminazioneCliente";
import "../../../css/modal.css";

export default function EliminazioneCliente({ cliente }) {
    const modalRef = useRef(null);
    const { handleDelete, closeModal } = useEliminazioneCliente({
        cliente,
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            <h3 id="modal-title">Eliminazione cliente</h3>
            <div id="eliminazione-cliente-container">
                <p>
                    Sei sicuro di voler eliminare il cliente
                    <span id="cliente-cognome-nome">
                        {cliente.cognome && cliente.nome
                            ? " " + cliente.cognome + " " + cliente.nome
                            : cliente.cognome && !cliente.nome
                            ? " " + cliente.cognome
                            : !cliente.cognome && cliente.nome
                            ? " " + cliente.nome
                            : ""}
                    </span>
                    ?
                </p>
                <div id="btns-container">
                    <button
                        type="submit"
                        id="modal-submit-danger-btn"
                        className="modal-form-btn"
                        onClick={handleDelete}
                    >
                        Si
                    </button>
                    <button
                        type="button"
                        id="modal-close-btn"
                        className="modal-form-btn"
                        onClick={closeModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
}
