import React, { useEffect, useState } from "react";

/* import { Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, Table } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"; */
import { addProduct, editProduct, getProducts, editPriceProducts } from "../../../context/Product";
import { useProductDispatch } from "../../../context/Product";

import { addProveedor, getProveedores } from "../../../context/Proveedor";
import { useProveedorDispatch, useProveedorState, } from "../../../context/Proveedor";
import CardProductos from "./components/CardProductos";
import ModalActualizarPrecios from "./components/ModalActualizarPrecios";
import ModalNuevoProducto from "./components/ModalNuevoProducto";
import ModalNuevoProveedor from "./components/ModalNuevoProveedor";
import * as XLSX from "xlsx";

const RecentSales = () => {

  const { proveedores, /* loading, errorMessage */ } = useProveedorState();
  const dispatch = useProductDispatch();
  const dispatchProveedor = useProveedorDispatch();
  const [state, setState] = useState({
    modal: false,
    modalProveedor: false,
    modalPrice: false
  });
  const [typePrice, setTypePrice] = useState(0);
  const [typeProveedor, setTypeProveedor] = useState('');

  const [increment, setIncrement] = useState({
    codigo: '',
    aumento: 0,
    type: 'ambos'
  });
  const [product, setProduct] = useState({
    _id: '',
    codigo: '',
    codigoProvedor: '',
    nombre: '',
    descripcion: '',
    precio: '',
    precioWholesaler: '',
    imagen: '',
    categoria: ''
  });
  const [proveedor, setProveedor] = useState({
    codigo: '',
    nombre: ''
  });
  const { codigo, codigoProvedor, nombre, descripcion, precio, precioWholesaler } = product;
  const { codigo: codProveedor, nombre: NomProveedor } = proveedor;

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  const toggleProveedor = () => {
    setState({
      modalProveedor: !state.modalProveedor
    });
  };

  const togglePrice = () => {
    setState({
      modalPrice: !state.modalPrice
    });
  };

  const handleChangeSelect = (e) => {
    setTypePrice(Number(e.target.value));
  };

  const handleChangeSelectProveedor = (e) => {
    setTypeProveedor((e.target.value));
  };
  const handleChangeProduct = (product = undefined) => {
    if (product) {
      setProduct({
        ...product,
        codigoProvedor: product.codigoProvedor.codigo
      });
    }
    else
      setProduct({
        _id: '',
        codigo: '',
        codigoProvedor: '',
        nombre: '',
        descripcion: '',
        precio: '',
        precioWholesaler: '',
        imagen: '',
        categoria: '',
      });
  };

  const handleChange = (event) => {
    const { base64 = undefined } = event;
    if (base64) {
      setProduct({
        ...product,
        imagen: base64,
      });
    } else {
      const { target } = event;
      const { value } = target;
      const { name } = target;
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleChangeProveedor = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    setProveedor({
      ...proveedor,
      [name]: value,
    });
  };

  const handleChangePrice = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    setIncrement({
      ...increment,
      [name]: value,
    });
  };

  const exportPDFWithComponent = () => {
    window.print()
  };

  const importFile = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const dataWith = data.slice(2, data.length) ;
      const result = dataWith.map(element => ({
        filter: { codigo: element[0] },
        update: { precioWholesaler: element[2] }
      }))
      console.log(result);
    };
    reader.readAsBinaryString(file);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (product._id) {
      editProduct(dispatch, product);
    } else {
      delete product._id;
      addProduct(dispatch, {
        ...product,
        categoria: 'general'
      });
    }
    toggle();
  }

  const submitFormProveedor = (e) => {
    e.preventDefault();
    if (proveedor._id) {
      editProduct(dispatch, product);
    } else {
      addProveedor(dispatchProveedor, proveedor);
      setProveedor({
        codigo: '',
        nombre: '',
      }
      )
    }
    toggleProveedor();
  }

  const submitFormIncrement = (e) => {
    e.preventDefault();
    editPriceProducts(dispatch, { codigo: Number.parseInt(increment.codigo), aumento: increment.aumento, type: increment.type })
    togglePrice();
  }

  useEffect(() => {
    getProducts(dispatch);
    getProveedores(dispatchProveedor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <>
      <CardProductos
        typePrice={typePrice}
        typeProveedor={typeProveedor}
        proveedores={proveedores}
        togglePrice={togglePrice}
        toggleProveedor={toggleProveedor}
        handleChangeSelect={handleChangeSelect}
        handleChangeProduct={handleChangeProduct}
        handleChangeSelectProveedor={handleChangeSelectProveedor}
        toggle={toggle}
        exportPDFWithComponent={exportPDFWithComponent}
        importFile={importFile}
      />

      {/* <tr>
                <td>2</td>
                <td>Real Homes WP Theme</td>

      {/* modal nuevo producto o edit */}
      <div>
        <ModalNuevoProducto
          state={state}
          toggle={toggle}
          codigo={codigo}
          codigoProvedor={codigoProvedor}
          nombre={nombre}
          descripcion={descripcion}
          precio={precio}
          precioWholesaler={precioWholesaler}
          submitForm={submitForm}
          handleChange={handleChange}
        />
      </div>
      {/* modal nuevo proveedor */}
      <div>
        <ModalNuevoProveedor
          state={state}
          toggleProveedor={toggleProveedor}
          codProveedor={codProveedor}
          NomProveedor={NomProveedor}
          submitFormProveedor={submitFormProveedor}
          handleChangeProveedor={handleChangeProveedor}
        />
      </div>
      {/* modal Actualizar precios proveedor */}
      <div>
        <ModalActualizarPrecios
          state={state}
          togglePrice={togglePrice}
          increment={increment}
          proveedores={proveedores}
          submitFormIncrement={submitFormIncrement}
          handleChangePrice={handleChangePrice}
        />
      </div>
    </>
  );
};

export default RecentSales;

/* <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle className="text-uppercase">Productos</CardTitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center d-print-none">
              <div className="dl">
                <Label>Tipo</Label>
                <Input type="select" className="custom-select" value={typePrice} onChange={handleChangeSelect}>
                  <option value="0">Todo</option>
                  <option value="1">Capital</option>
                  <option value="2">Interior</option>
                </Input>
              </div>
              <div className="dl">
                <Label>Proveedor</Label>
                <Input type="select" className="custom-select" value={typeProveedor} onChange={handleChangeSelectProveedor}>
                  <option key={Math.random()} value={''}>Todos</option>
                  {proveedores.map(p => (
                    <option key={p._id} value={p._id}>{p.nombre}</option>
                  ))}
                </Input>
              </div>
            </div>
            <div className="ml-auto d-flex no-block align-items-center d-print-none">
              <div className="dl">
                <Button
                  color="info"
                  outline
                  onClick={e => {
                    togglePrice();
                  }}
                >Actualizar precio por proveedor
                </Button>
                <Button
                  color="info"
                  outline
                  onClick={e => {
                    toggleProveedor();
                  }}
                >Agregar proveedor
                </Button>
                <Button
                  color="success"
                  outline
                  onClick={e => {
                    handleChangeProduct();
                    toggle();
                  }}
                >Agregar producto
                </Button>
                <Button
                  color="danger"
                  outline
                  onClick={exportPDFWithComponent}
                > Imprimir PDF
                </Button>
              </div>
            </div>
          </div>
          <Table
            className="no-wrap v-middle font-weight-light mb-0"
            responsive
            hover
            striped
          >
            <thead>
              <tr className="border-0">
                <th className="border-0">#</th>
                <th className="border-0"># Proveedor</th>
                <th className="border-0 text-uppercase">Nombre</th>
                <th className="border-0 text-uppercase">Descripcion</th>
                {
                  typePrice === 0 ?
                    <>
                      <th className="border-0 text-uppercase text-success font-medium">Precio Capital</th>
                      <th className="border-0 text-uppercase text-info font-medium">Precio Interior</th>
                    </>
                    : typePrice === 1 ?
                      <>
                        <th className="border-0 text-uppercase text-success font-medium">Precio Capital</th>
                      </>
                      : <>
                        <th className="border-0 text-uppercase text-info font-medium">Precio Interior</th>
                      </>
                }
                <th className="border-0 text-uppercase d-print-none">Editar</th>
              </tr>
            </thead>
            <tbody>
              {products && products.map(p => (
                typeProveedor === '' ?
                  <tr key={p._id}>
                    <td>{p.codigo}</td>
                    <td>{p.codigoProvedor.nombre}</td>
                    <td>
                      <span className="text-uppercase">{p.nombre}</span>
                    </td>
                    <td>{p.descripcion}</td>
                    {
                      typePrice === 0 ?
                        <>
                          <td className="text-success">$ {p.precio.toFixed(2)}</td>
                          <td className="text-info font-medium">$ {p.precioWholesaler.toFixed(2)}</td>
                        </>
                        : typePrice === 1 ?
                          <>
                            <td className="text-success">$ {p.precio}</td>
                          </>
                          : <>
                            <td className="text-info font-medium">$ {p.precioWholesaler}</td>
                          </>
                    }
                    <td>
                      <button
                        type="button"
                        className="btn btn-info btn-circle btn-circle ml-2 d-print-none"
                        onClick={e => {
                          handleChangeProduct(p);
                          toggle();
                        }}
                      >
                        <i className="far fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  : typeProveedor === p.codigoProvedor._id
                    ? <tr key={p._id}>
                      <td>{p.codigo}</td>
                      <td>{p.codigoProvedor.nombre}</td>
                      <td>
                        <span className="text-uppercase">{p.nombre}</span>
                      </td>
                      <td>{p.descripcion}</td>
                      {
                        typePrice === 0 ?
                          <>
                            <td className="text-success">$ {p.precio.toFixed(2)}</td>
                            <td className="text-info font-medium">$ {p.precioWholesaler.toFixed(2)}</td>
                          </>
                          : typePrice === 1 ?
                            <>
                              <td className="text-success">$ {p.precio}</td>
                            </>
                            : <>
                              <td className="text-info font-medium">$ {p.precioWholesaler}</td>
                            </>
                      }
                      <td>
                        <button
                          type="button"
                          className="btn btn-info btn-circle btn-circle ml-2 d-print-none"
                          onClick={e => {
                            handleChangeProduct(p);
                            toggle();
                          }}
                        >
                          <i className="far fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                    : null
              ))}
            </tbody>
            </Table>
            </CardBody>
          </Card> */