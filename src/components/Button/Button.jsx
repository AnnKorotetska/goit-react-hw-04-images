import { BtnStyled } from './ButtonStyled';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return <BtnStyled onClick={onClick}>Load more</BtnStyled>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
