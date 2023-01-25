import { useState, useEffect} from "react";
import { fetchImages } from "Api/Api";
import { Loader } from "components/Loader/Loader";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Btn } from "components/Button/Button";
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
  }

export const ImageGallery = ({currentSearch}) => {
    const [inputSearch, setInputSearch] = useState('');
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [pageNr, setPageNr] = useState(1);
    const [status, setStatus] = useState(Status.IDLE);

    useEffect(() => {
        if (!currentSearch) {
            return;
        }

        
        setInputSearch(currentSearch);
        setPageNr(1);
        setStatus(Status.PENDING);

        fetchImages(currentSearch, 1)
            .then(images => {
                setImages(images);
                setStatus(Status.RESOLVED);
                setPageNr(state => state + 1);
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            });

    }, [currentSearch]);

    const onClickMore = async () => {
        const response = await fetchImages(inputSearch, pageNr,)
        setPageNr(state => state + 1);
        setImages([...images, ...response]);
      };

    if (status === Status.IDLE) {
        return <div>Search images and photos</div>
    }

    if (status === Status.PENDING) {
        return <Loader />
    }

    if (status === Status.REJECTED) {
        return <p>{error}</p>
    }

    if (status === Status.RESOLVED) {
        return (
            <div className={css.wrapper}>
                <ul className={css.imageGallery}>
                {images.map((image, index) => (
                <ImageGalleryItem 
                image={image} 
                key={index}
                />
                ))}
                </ul>
                {images.length > 0 ? (
                <Btn 
                onClick={onClickMore}
                />
                ) : (<p>No images found</p>)}
            </div>
        );
    }
}

ImageGallery.porpTypes = {
    inputSearch: PropTypes.string.isRequired,
}