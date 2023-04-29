import React, { useRef } from 'react'
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";

// Stylesheet
import './Header.css'


// This constant defines the labels and links to be used in the navigation menu
// of the React app header. It contains an array of objects, where each object
// represents a link to a page and contains a display name and URL.
const NAV__LINKS = [
  {
    display: "Products",
    url: "/products",
  },
  {
    display: "Shopping",
    url: "/shopping",
  },
];

const Header = () => {

  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container fluid>

        <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
          <ul className="nav__list">
            {NAV__LINKS.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.url}
                  className={(navClass) =>
                    navClass.isActive ? "active" : ""
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

      </Container>
    </header>
  )
}

export default Header