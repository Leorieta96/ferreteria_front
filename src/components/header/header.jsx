import React from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  Button,
} from "reactstrap";

/* import profilephoto from "../../assets/images/users/1.jpg";
 */
/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../assets/images/logo-icon.png";
import logolighticon from "../../assets/images/logo-light-icon.png";
import logodarktext from "../../assets/images/logo-text.png";
import logolighttext from "../../assets/images/logo-light-text.png";
import { logout, useAuthDispatch } from "../../context/Auth";
import { NavLink } from "react-router-dom";

const Header = ({ props }) => {
  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const dispatch = useAuthDispatch() // read dispatch method from context

  const handleLogout = () => {
    logout(dispatch) //call the logout action

    //useHistory('/login')
    props.history.push('/login') //navigate to logout page on logout
  }

  /*const [toogle, setToogle] = useState(false);

   const handleToogle = () => {
    setToogle(!toogle);
  } */

  return (
    <header className="topbar navbarbg" data-navbarbg="skin5">
      <Navbar className="top-navbar" dark expand="md">
        <div className="navbar-header" id="logobg" data-logobg="skin6">
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand tag={NavLink} to="/dashboard">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              <img src={logolighticon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
              <img src={logolighttext} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <button
            className="btn-link nav-toggler d-block d-md-none"
            onClick={() => showMobilemenu()}
          >
            <i className="ti-menu ti-close" />
          </button>
        </div>
        <Collapse className="navbarbg" navbar data-navbarbg="skin5">
          <Nav className="ml-auto float-right" navbar>
            {/* <NavItem>
              <a
                href="link"
                className="btn btn-danger mr-2"
                style={{ marginTop: "15px" }}
              >
                Upgrade to Pro
              </a>
            </NavItem> */}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <Button color="secondary" className="ml-3 mb-2 mt-2 "  onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
            {/* <UncontrolledDropdown nav inNavbar  >
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={''}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
                <span className="ml-2"> Steave</span>
              </DropdownToggle>
              <DropdownMenu end className="user-dd">
                <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> Opciones
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="ti-settings mr-1 ml-1" /> Configuración
                </DropdownItem>
                <DropdownItem divider />
                <Button color="success" className="btn-rounded ml-3 mb-2 mt-2" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
export default Header;
