import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import "../../../css/Modal.css";
import { useEliminazioneLavoro } from "../../Hooks/Components/Modals/useEliminazioneLavoro";

export default function EliminazioneLavoro({ ordine, stato }) {
    const modalRef = useRef(null);
    const { handleDelete, closeModal } = useEliminazioneLavoro({
        ordine,
        modalRef,
        stato,
    });

    return (
        <Modal ref={modalRef}>
            <h3 id="modal-title">Eliminazione lavoro</h3>
            <div id="eliminazione-container">
                <p>Sei sicuro di voler eliminare il lavoro?</p>
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
