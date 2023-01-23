import { useState } from "react";
import css from '../Searchbar/Searchbar.module.css';
import { HiMagnifyingGlass } from "react-icons/hi2";
import PropTypes from 'prop-types';

export const Searchbar = (props) => {
    const [inputSearch, setInputSearch] = useState('');

    const handleChange = e => {
        setInputSearch(e.target.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (inputSearch.trim() === '') {
            alert('Write correct word');
            return;
        } else {
            props.onSubmit(inputSearch);
            setInputSearch('');
        }
        e.target.reset();
    }

    return (
        <header className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.searchbar__form}>
                <button type="submit" className={css.searchbar__btn}>
                <span className={css.searchbar__btn__icon}>
                    <HiMagnifyingGlass />
                </span>
                </button>
                <input
                className={css.searchbar__input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };