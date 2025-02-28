import React, { useRef } from "react";
import { Modal } from "@inertiaui/modal-react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";

const Lavorazione = ({ ordine }) => {
    const modalRef = useRef(null);

    const { handleFileChange, handleLavorazione, processing } = useLavorazione({
        modalRef,
    });

    return (
        <Modal ref={modalRef}>
            <h3>Caricamento Lavorazione</h3>
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
                <button id="submit-btn" type="submit" disabled={processing}>
                    Invia Lavorazione
                </button>
            </form>
        </Modal>
    );
};

export default Lavorazione;
