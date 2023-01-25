import css from '../Modal/Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal_root');

export const Modal = ({children, onClose}) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

     const handleBackdrop = e => {
        if (e.currentTarget === e.target) {
            onClose()
        }
    }


    return createPortal(
        <div className={css.modal__backdrop} onClick={handleBackdrop}>
            <div className={css.modal__content}>
                {children}
            </div>
        </div>,
        modalRoot,
    );
}


Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};