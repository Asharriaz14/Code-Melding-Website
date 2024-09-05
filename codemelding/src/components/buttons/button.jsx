import PropTypes from 'prop-types';

const Button = ({ onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex justify-center items-center h-[40px] w-32  overflow-hidden border border-orange-400 bg-Orange text-white shadow-2xl transition-all
                hover:shadow-orange-400 hover:text-white 
                before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 
                hover:before:w-full ${className}`}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;
