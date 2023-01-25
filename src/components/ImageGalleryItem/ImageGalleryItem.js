import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Fragment, useState } from 'react';
import { Modal } from "components/Modal/Modal";

export const ImageGalleryItem = ({ image, onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgAlt, setImgAlt] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const onOpenModal = e => {
    setShowModal(true);
    setImgSrc(e.target.name);
    setImgAlt(e.target.alt);
};

const toggleModal = () => {
  setShowModal(!showModal);
}

  const onCloseModal = e => {
    e.stopPropagation();
    setShowModal(false);
    setImgSrc('');
    setImgAlt('');
}
  
  return (
    <Fragment>
      <li className={css.ImageGalleryItem} id={image.id} onClick={onOpenModal}>
        <img
        src={image.webformatURL}
        alt={image.tags}
        name={image.largeImageURL}
        className={css.ImageGalleryItemImage}
        />
      </li>
      {showModal && <Modal onClose={toggleModal}>
        <button className={css.closeBtn} type='button' onClick={onCloseModal}>Close</button>
        <img className={css.modal__img} src={imgSrc} alt={imgAlt} />
        <p className={css.modal__text}>{imgAlt}</p>
      </Modal>}
    </Fragment>
  )
  
};

ImageGalleryItem.propTypes = {
  image: 
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
};