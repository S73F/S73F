import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";
import "../../../css/modal.css";

const Lavorazione = ({ ordine }) => {
    const modalRef = useRef(null);

    const { handleFileChange, handleLavorazione, processing, closeModal } =
        useLavorazione({
            modalRef,
        });

    return (
        <Modal ref={modalRef}>
            <h3 id="modal-title">Caricamento Lavorazione</h3>
            <div id="caricamento-lavorazione-container">
                <form
                    onSubmit={(e) => handleLavorazione(e, ordine)}
                    encType="multipart/form-data"
                >
                    <div className="form-field">
                        <input
                            id="userfile"
                            name="userfile"
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div id="btns-container">
                        <button
                            type="submit"
                            id="modal-submit-btn"
                            className="modal-form-btn"
                            disabled={processing}
                        >
                            Invia
                        </button>
                        <button
                            type="button"
                            id="modal-close-btn"
                            className="modal-form-btn"
                            onClick={closeModal}
                        >
                            Chiudi
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default Lavorazione;
