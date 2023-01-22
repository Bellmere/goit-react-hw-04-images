import { Component } from "react";
import { fetchImages } from "Api/Api";
import { Loader } from "components/Loader/Loader";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Btn } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
    state = {
        inputSearch: '',
        error: null,
        status: 'idle',
        images: [],
        pageNr: 1,
        showModal: false,
        imgSrc: '',
        imgAlt: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const prevSearch = prevProps.inputSearch;
        const currentSearch = this.props.inputSearch;

        if (prevSearch !== currentSearch) {
            this.setState({status: 'pending', inputSearch: currentSearch});

            fetchImages(currentSearch, 1)
            .then(images => this.setState({images, status: 'resolved'}))
            .catch(error => this.setState({error, status: 'rejected'}));
        }
    };

    onClickMore = async () => {
        const {inputSearch, pageNr, images} = this.state;
        const response = await fetchImages(inputSearch, pageNr + 1,)
        this.setState({
          images: [...images, ...response],
          pageNr: pageNr + 1,
        });
      };

    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal,
        }))
    }

    onOpenModal = e => {
        console.log(e.target.alt);
        this.setState({
            showModal: true,
            imgSrc: e.target.name,
            imgAlt: e.target.alt,
        });
    };

    onCloseModal = e => {
        e.stopPropagation();
        this.setState({
            showModal: false,
            imgSrc: '',
            imgAlt: '',
        })
    }

    render() {
        const {images, error, status, showModal, imgSrc, imgAlt} = this.state;

        if (status === 'idle') {
            return <div>Search images and photos</div>
        }

        if (status === 'pending') {
            return <Loader />
        }

        if (status === 'rejected') {
            return <p>{error}</p>
        }

        if (status === 'resolved') {
            return (
                <div className={css.wrapper}>
                    <ul className={css.imageGallery}>
                {images.map((image, index) => (
                <ImageGalleryItem 
                image={image} 
                key={index}
                onClick={this.onOpenModal} 
                />
                ))}
                </ul>
                {images.length > 0 ? (
                <Btn 
                onClick={this.onClickMore}
                />
                ) : (<p>No images found</p>)}
                {showModal && <Modal onClose={this.toggleModal}>
                    <button className={css.closeBtn} type='button' onClick={this.onCloseModal}>Close</button>
                    <img className={css.modal__img} src={imgSrc} alt={imgAlt} />
                    <p className={css.modal__text}>{imgAlt}</p>
                </Modal>}
                </div>
            );
        }

    };
}

ImageGallery.porpTypes = {
    inputSearch: PropTypes.string.isRequired,
}