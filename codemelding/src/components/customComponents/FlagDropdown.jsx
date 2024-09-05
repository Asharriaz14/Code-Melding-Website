import  { useState, useRef, useEffect,useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../App.css'

const FlagDropdown = ({ countries = [], selectedCountry = '', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const defaultCountry = 'PK';
  const initialCountry = selectedCountry || defaultCountry;
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedFlag = useMemo(() => {
    const country = countries.find((country) => country.cca2 === initialCountry);
    return country ? country.flags.svg : '';
  }, [countries, initialCountry]);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-white border-y border-l border-[#E1E5EF] rounded-l-lg focus:border-Orange focus:ring-2 focus:ring-orange-500 py-2 px-2 text-gray-900 flex items-center justify-between text-sm"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          {selectedFlag && (
            <img
              src={selectedFlag}
              alt="Selected flag"
              width="20"
              className="mr-2"
            />
          )}
        </div>
        <span>&#9662;</span> 
      </button>
      {isOpen && (
        <div className="absolute bg-white border border-[#E1E5EF] rounded-lg mt-1 w-full max-h-[200px] overflow-y-auto z-10 dropdown-scrollbar">
          {countries.map((country) => (
            <div
              key={country.cca2}
              className="p-2 flex items-center justify-center cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange(country.cca2);
                setIsOpen(false);
              }}
            >
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                width="20"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FlagDropdown.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      cca2: PropTypes.string.isRequired,
      flags: PropTypes.shape({
        svg: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedCountry: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FlagDropdown;
