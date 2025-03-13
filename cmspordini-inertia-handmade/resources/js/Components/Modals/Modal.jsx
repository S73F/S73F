import React from "react";
import "../../../css/modal.css";

const modalOverlay = ({ onClose, children }) => {
    return (
        <div id="modal-overlay" onClick={onClose}>
            {children}
        </div>
    );
};

const modalContent = ({ children, title, onClose }) => {
    return (
        <div id="modal-content" onClick={(e) => e.stopPropagation()}>
            <div id="modal-close--container">
                <button id="modal-close" onClick={onClose}>
                    X
                </button>
            </div>
            {title && <h3 id="modal-title">{title}</h3>}
            {children}
        </div>
    );
};

const Modal = {
    Overlay: modalOverlay,
    Content: modalContent,
};

export default Modal;
