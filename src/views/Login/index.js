import React, { useState } from "react";
import {
  /*   Alert,
   */ Button,
  Card,
  CardBody,
  /*   CardHeader,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  Row, */
  Input,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import { loginUser, useAuthDispatch, useAuthState } from "../../context/Auth";

/* import Fondo from "../../assets/images/background/img5.jpg"; */
import "./login.module.css";

//import "./login.module.css";

function Login(props) {
  // const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
  const { /* loading, */ errorMessage } = useAuthState(); //read the values of loading and errorMessage from context

  const handlelogin = async (e) => {
    e.preventDefault();
    let payload = { password, dni };

    try {
      let response = await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes

      if (!response.usuario) return;
      props.history.push("/dashboard"); //navigate to dashboard on success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="main-wrapper"
      data-theme="light"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <Card>
            <CardBody>
              <h1>Iniciar Sesión</h1>
              <br />
              {errorMessage ? (
                <UncontrolledAlert className="error" color="danger">
                  {errorMessage}
                </UncontrolledAlert>
              ) : null}
              <form>
                <div>
                  <div className="mb-3" id="loginform">
                    <Label htmlFor="email">DNI</Label>
                    <Input
                      type="text"
                      id="dni"
                      value={dni}
                      placeholder="Ingrese su DNI"
                      onChange={(e) => {
                        setDni(e.target.value);
                      }}
                    />
                  </div>
                  <div className="loginform">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      placeholder="Ingrese la contraseña"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <br />
                <Button onClick={handlelogin} color="primary">
                  Ingresar
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>

    //     <div
    //       className=''
    //     >

    // <Row className='  rounded-5  ' >
    //         <Col xs="12" md="6" sm='12' lg='6' className='offset-md-4 '>
    //           <Card body outline color="success" className="border " >

    //             <CardHeader>Iniciar Sesión</CardHeader>
    //             <CardBody>
    //               <div id="loginform" className="form-group">
    //               <label htmlFor="email">Email</label>
    //               <Input
    //                 type="text"
    //                 className="form-control"
    //                 name="email"
    //                 value={email}
    //                 onChange={(e) => {
    //                   setEmail(e.target.value);
    //                 }}
    //               // validations={[required]}
    //               />
    //             </div>

    //               <div className="form-group">
    //                 <label htmlFor="password">Password</label>
    //                 <Input
    //                   type="password"
    //                   className="form-control"
    //                   name="password"
    //                   value={password}
    //                   onChange={(e) => {
    //                     setPassword(e.target.value);
    //                   }}
    //                 // validations={[required]}
    //                 />
    //               </div>

    //               <div className="form-group">
    //                 <button className="btn btn-primary btn-block" disabled={loading} onClick={handlelogin}>
    //                   {loading && (
    //                     <span className="spinner-border spinner-border-sm"></span>
    //                   )}
    //                   <span>Login</span>
    //                 </button>
    //               </div></CardBody>

    //           </Card>
    //         </Col>
    //       </Row>

    //     </div>
  );
}

export default Login;
