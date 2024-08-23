import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CompanyLinks, CompanyData, CompanySocial } from './FooterLinks';

const Footer = () => (
  <footer className="bg-[#1A1D2B]">
    <div className="container mx-auto p-6 md:px-8 pt-16 xl:px-0">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4  ml-3 mb-8">
          <a href="/" className="flex items-center text-4xl md:text-6xl text-white">
            <p>
              <span className="text-Orange mr-2">Let`s</span>
              start with us in
              <br />
              <span className="text-Orange mr-2">Developing</span>
              Apps!
            </p>
          </a>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 p-4">
            <h3 className="text-xl font-semibold text-Orange">Code Melding</h3>
            <p className="max-w-md pr-16 text-md text-gray-200 mt-3 text-justify">
              We harness the latest technologies to create innovative solutions that empower businesses like yours. Our commitment to excellence ensures that we not only meet but exceed your expectations, making your journey smoother and more successful. Let us be your partner in achieving your digital goals.
            </p>
          </div>
          <div className="w-full lg:w-2/3 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FooterColumn title="Company" items={CompanyLinks} />
            <FooterColumn title="Contact" items={CompanyData} />
            <FooterColumn title="Social" items={CompanySocial} />
          </div>
        </div>
        <div className="mt-16 border-t border-White pt-4">
          <p className="text-md text-center text-White">©2024 CodeMelding. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);

const FooterColumn = ({ title, items }) => (
    <div>
      <h3 className="text-md font-semibold leading-6 text-White">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <Link to={item.to} className="text-md leading-6 text-white hover:text-Orange">
                {item.name}
              </Link>
            ) : (
              <p className="text-md leading-6 text-White">{item.name}</p> 
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
  
  FooterColumn.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,  
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
export default Footer;
