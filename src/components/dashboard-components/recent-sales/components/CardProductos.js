import React from 'react';
import { Button, Card, CardBody, CardHeader, Input, /* InputGroup, InputGroupText,  */Table } from 'reactstrap';
import { useProductState } from '../../../../context/Product';

const CardProductos = ({ 
  typePrice,
  togglePrice,
  toggleProveedor,
  handleChangeSelect,
  handleChangeProduct,
  toggle,
  exportPDFWithComponent,
  typeProveedor,
  proveedores,
  handleChangeSelectProveedor,
  importFile
}) => {
  const { products, /* loading, errorMessage */ } = useProductState();

  return (
    <Card
      color="secondary"
      outline
    >
      <CardHeader className="text-uppercase">Productos
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center">

          <div className=" d-flex no-block align-items-center d-print-none">
            <div className='dl mr-1 d-print-none'>
              <Input type="select" className="custom-select" value={typePrice} onChange={handleChangeSelect}>
                <option value="0">Todo</option>
                <option value="1">Capital</option>
                <option value="2">Interior</option>
              </Input>
            </div>
            <div className='dl mr-1 d-print-none'>
              <Input type="select" className="custom-select" value={typeProveedor} onChange={handleChangeSelectProveedor}>
                <option key={Math.random()} value={''}>Todos</option>
                {proveedores.map(p => (
                  <option key={p._id} value={p._id}>{p.nombre}</option>
                ))}
              </Input>
            </div>

            <div className='dl mr-1'>
              <Button
                color="info"
                outline
                onClick={e => {
                  togglePrice();
                }}
              >Actualizar precio por proveedor
              </Button>

              &nbsp;
              <Button
                color="info"
                outline
                onClick={e => {
                  toggleProveedor();
                }}
              >Agregar proveedor
              </Button>
              &nbsp;

              <Button
                color="success"
                outline
                onClick={e => {
                  handleChangeProduct();
                  toggle();
                }}
              >Agregar producto
              </Button>
              &nbsp;

              <Button
                color="warning"
                outline
              > <input type="file" onChange={importFile} />Importar EXCEL
              </Button>
              &nbsp;
              <Button
                color="danger"
                outline
                onClick={exportPDFWithComponent}
              > Imprimir PDF
              </Button>

            </div>

          </div>
        </div>
        <hr />
        <Table
          className="v-middle font-weight-light mb-0"
          responsive
          hover
          striped
        >
          <thead>
            <tr className="border-0">
              <th className="border-0">#</th>
              <th className="border-0"># Proveedor</th>
              <th className="border-0">Ilustracion</th>
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
                  <td>{p.imagen ? <img className="img-fluid rounded mx-auto d-block" style={{ width: 250 }} src={p.imagen} alt={p.nombre} /> : ''}</td>
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
                          <td className="text-success">$ {p.precio.toFixed(2)}</td>
                        </>
                        : <>
                          <td className="text-info font-medium">$ {p.precioWholesaler.toFixed(2)}</td>
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
                    <td>{p.imagen ? <img className="img-fluid rounded mx-auto d-block" style={{ width: 250 }} src={p.imagen} alt={p.nombre} /> : ''}</td>
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
    </Card>
  )
};

export default CardProductos;

/* <tr>
      <td>2</td>
      <td>Real Homes WP Theme</td>

      <td>EXTENDED</td>
      <td>April 19, 2017</td>
      <td className="text-success">$24</td>
      <td className="text-info">$1250</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td>3</td>
      <td>Ample Admin</td>

      <td className="text-uppercase">EXTENDED</td>
      <td>April 19, 2017</td>
      <td className="text-success">$24</td>
      <td className="text-info font-medium">$1250</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td>4</td>
      <td>Medical Pro WP Theme</td>

      <td>TAX</td>
      <td>April 20, 2017 </td>
      <td className="text-danger">-$24</td>
      <td className="text-danger">-$24</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td>5</td>
      <td>Hosting press html </td>

      <td>SALE</td>
      <td>April 21, 2017 </td>
      <td className="text-danger">-$24</td>
      <td className="text-success">$24</td>
      <td>
        <button
          type="button"
          className=</Page><Document/>"btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td>6</td>
      <td>Digital Agency PSD</td>

      <td>SALE</td>
      <td>April 23, 2017</td>
      <td className="text-danger">-$24</td>
      <td className="text-danger">-$14</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr>
    <tr>
      <td>7</td>
      <td>Helping Hands WP Theme</td>

      <td>MEMBER</td>
      <td>April 22, 2017</td>
      <td className="text-danger">-$24</td>
      <td className="text-success">$64</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-circle btn-circle ml-2"
          onClick={toggle}
        >
          <i className="far fa-edit"></i>
        </button>
      </td>
    </tr> */