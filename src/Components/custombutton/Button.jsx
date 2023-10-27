import PropTypes from 'prop-types';

function Button({ type, onClick, children }) {
  return (
    <button className={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired, // Use children instead of content
};

export default Button;
