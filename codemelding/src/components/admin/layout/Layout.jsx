import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar should have specific classes for small screens */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Ensure the main content area is responsive */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
