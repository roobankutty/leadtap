import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light top-header">
      <div className="container header-container">

        <Link className="navbar-brand" to="/">
          <img
            className="banner-img"
            src="/logo.png"
            alt="LeadTap Property"
            width="75"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-lg-3 ${isActive ? "fw-bold text-primary" : ""}`
                }
              >
                Home
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `nav-link px-lg-3 ${isActive ? "fw-bold text-primary" : ""}`
                }
              >
                Properties
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link px-lg-3 ${isActive ? "fw-bold text-primary" : ""}`
                }
              >
                About
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `nav-link px-lg-3 ${isActive ? "fw-bold text-primary" : ""}`
                }
              >
                Services
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link px-lg-3 ${isActive ? "fw-bold text-primary" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}