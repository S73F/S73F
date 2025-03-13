import Modal from "./Modal";
import React from "react";
import { useLavorazione } from "../../Hooks/Components/Modals/useLavorazione";

export const Lavorazione = ({ onClose, ordine }) => {
    const { handleFileChange, handleLavorazione, processing } = useLavorazione({
        onSuccess: onClose,
    });

    return (
        <Modal.Overlay onClose={onClose}>
            <Modal.Content title={"Caricamento Lavorazione"}>
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
            </Modal.Content>
        </Modal.Overlay>
    );
};
