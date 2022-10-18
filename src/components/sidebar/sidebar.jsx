import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { logout, useAuthDispatch } from "../../context/Auth";

const Sidebar = (props) => {
  /*--------------------------------------------------------------------------------*/
  /*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
  /*--------------------------------------------------------------------------------*/
  const expandLogo = () => {
    document.getElementById("logobg").classList.toggle("expand-logo");
  };
  /*--------------------------------------------------------------------------------*/
  /*Verifies if routeName is the one active (in browser input)                      */
  /*--------------------------------------------------------------------------------*/
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "selected" : "";
  };

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    logout(dispatch) //call the logout action

    //useHistory('/login')
    props.history.push('/login') //navigate to logout page on logout
}

  return (
    <aside
      className="left-sidebar d-print-none"
      id="sidebarbg"
      data-sidebarbg="skin6"
      onMouseEnter={expandLogo.bind(null)}
      onMouseLeave={expandLogo.bind(null)}
    >
      <div className="scroll-sidebar">
        <PerfectScrollbar className="sidebar-nav">
          {/*--------------------------------------------------------------------------------*/}
          {/* Sidebar Menus will go here                                                */}
          {/*--------------------------------------------------------------------------------*/}
          <Nav id="sidebarnav">
            {props.routes.map((prop, key) => {
              if (prop.redirect) {
                return null;
              } else {
                return (
                  /*--------------------------------------------------------------------------------*/
                  /* Adding Sidebar Item                                                            */
                  /*--------------------------------------------------------------------------------*/
                  <li
                    className={
                      activeRoute(prop.path) +
                      (prop.pro ? " active active-pro" : "") +
                      " sidebar-item"
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="sidebar-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <span className="hide-menu">{prop.name}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
            <li 
              className='fixed-bottom sidebar-item '
            >
              <NavLink
                onClick={handleLogout}
                to='/login'
                className="sidebar-link"
                activeClassName="active"
              >
                <i className='fas fa-sign-out-alt' />
                <span className="hide-menu">Cerrar Sesión</span>
              </NavLink>
            </li>
          </Nav>
        </PerfectScrollbar>
      </div>
    </aside>
  );
};
export default Sidebar;
