import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => (
  <li className={css.ImageGalleryItem} id={image.id} onClick={onClick}>
    <img
      src={image.webformatURL}
      alt={image.tags}
      name={image.largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: 
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  onClick: PropTypes.func.isRequired,
};