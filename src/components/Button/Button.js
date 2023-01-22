import css from '../Button/Button.module.css';
import PropTypes from 'prop-types';

export const Btn = ({onClick}) => (
    <div className={css.btnContainer}>
        <button className={css.loadMoreBtn} type='button' onClick={onClick}>
        Load More
    </button>
    </div>
);

Btn.propTypes = {
    onClick: PropTypes.func.isRequired,
};