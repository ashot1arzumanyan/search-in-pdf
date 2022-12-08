import { ReactNode, useEffect, useRef } from 'react';

interface ComponentProps {
  children: ReactNode;
  open: boolean;
  closeModal: VoidFunction;
}

const Modal = ({ children, open, closeModal }: ComponentProps) => {
  const modalRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (open) {
      const handleClose = (e: Event) => {
        if (e.target === modalRef.current) {
          closeModal();
        }
      };

      window.addEventListener('click', handleClose);

      return () => {
        window.removeEventListener('click', handleClose);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal" ref={modalRef}>
      <div className="content modal__content">
        <div className="header content__header">
          <button
            type="button"
            className="header__close button--clean"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
        <div className="content__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
