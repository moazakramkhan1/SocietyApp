import "../styles/Modal.css"
const Modal = ({ showModal, closeModal, children }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
