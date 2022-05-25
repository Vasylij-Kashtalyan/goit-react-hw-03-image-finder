import PropTypes from 'prop-types';
import s from "./Button.module.css"



function  Button({onClickLoad}) {
    return (
        <button className={s.Button} type="button" onClick={() => onClickLoad()}>Load more</button>
    )
};
Button.propTypes = {
    onClickLoad: PropTypes.func.isRequired,
}
export default Button;