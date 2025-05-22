import ReactDOM from 'react-dom';

function Backdrop() {
  return <div className="modal-backdrop fade show" />;
}

function ModalOverlay({ children }) {
  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById('overlays'))}
      {ReactDOM.createPortal(
        <div onClick={onClose}>
          <ModalOverlay>{children}</ModalOverlay>
        </div>,
        document.getElementById('overlays')
      )}
    </>
  );
}

export default Modal;
