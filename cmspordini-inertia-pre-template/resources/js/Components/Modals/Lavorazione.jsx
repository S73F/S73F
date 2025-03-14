import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";
import "../../../css/modal.css";
import Tiptap from "../Tiptap";

const Lavorazione = ({ ordine, note_int }) => {
    const modalRef = useRef(null);

    const {
        handleFileChange,
        handleEditorContentSave,
        handleLavorazione,
        processing,
        closeModal,
    } = useLavorazione({
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            <h2 id="modal-title">Modifica Lavorazione</h2>
            <div id="modal-lavorazione-container">
                <form
                    id="lavorazione-form"
                    onSubmit={(e) => handleLavorazione(e, ordine)}
                    encType="multipart/form-data"
                >
                    <h3 className="modal-subtitle">Carica file</h3>
                    <div className="form-field">
                        <input
                            id="userfile"
                            name="userfile"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>

                    <h3 className="modal-subtitle">Note</h3>
                    <Tiptap.Container>
                        <Tiptap.Editor
                            onEditorContentSave={handleEditorContentSave}
                            tipo={"note_int"}
                            htmlContent={note_int}
                        />
                    </Tiptap.Container>

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
