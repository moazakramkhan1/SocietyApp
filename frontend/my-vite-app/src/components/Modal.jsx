const Modal = ({ showModal, closeModal, children, FormType }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <h2>{FormType}</h2>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
