import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import PropTypes from 'prop-types'
function Layout({children}) {
  return (
    <div>
<Navbar />
<div className="">
{children}
</div>
<Footer />
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout