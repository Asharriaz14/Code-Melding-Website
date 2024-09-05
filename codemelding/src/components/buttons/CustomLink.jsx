    import PropTypes from 'prop-types';
    import { Link as RouterLink } from 'react-router-dom';

    const CustomLink = ({ to, children, className = '', noHover = false, ...props }) => {
        return (
            <RouterLink
            to={to}
            className={`relative flex justify-center items-center h-[50px] w-40 px-3 overflow-hidden border border-orange-400 bg-Orange text-white shadow-2xl transition-all
                ${noHover ? '' : 'hover:shadow-orange-400 hover:text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:before:w-full'}
                ${className}`}
            {...props}
        >
                <span className="relative z-10">{children}</span>
            </RouterLink>
        );
    };

    // relative flex items-center justify-center overflow-hidden bg-Orange text-white shadow-2xl transition-all 
    //                         before:absolute before:top-0 before:left-0 before:h-full before:w-full before:scale-0 
    //                         before:bg-orange-400 before:transition-transform before:duration-500 before:ease-out
    //                         hover:before:scale-100 hover:shadow-orange-400 
    CustomLink.propTypes = {
        to: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        noHover: PropTypes.bool,
    };

    export default CustomLink;
