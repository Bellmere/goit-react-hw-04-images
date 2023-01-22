import css from '../Loader/Loader.module.css';
import { ColorRing } from 'react-loader-spinner';;

export const Loader = () => (
    <div className={css.loader}>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    </div>
);