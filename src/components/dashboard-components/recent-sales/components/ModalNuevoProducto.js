import React from 'react';
import { Button, Form, FormFeedback, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useProveedorState } from '../../../../context/Proveedor';
import FileBase64 from 'react-file-base64';

const ModalNuevoProducto = ({ state, toggle, codigo, codigoProvedor, nombre, descripcion, precio, precioWholesaler, imagen, submitForm, handleChange }) => {
  const { proveedores, /* loading, errorMessage */ } = useProveedorState();

  return (
    <Modal fullscreen isOpen={state.modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar: Nombre producto</ModalHeader>
      <ModalBody>
        <Form className="form" onSubmit={submitForm}>
          <FormGroup>
            <Label># Codigo interno</Label>
            <Input
              type="text"
              name="codigo"
              id="codigo"
              placeholder="128AS"
              value={codigo}
              onChange={handleChange}
            />
            <FormFeedback>
              Uh oh! Looks like there is an issue with your codigo. Please input
              a correct codigo.
            </FormFeedback>
            <FormFeedback valid>
              That's a tasty looking codigo you've got there.
            </FormFeedback>
            <FormText>Ingrese codigo interno del producto</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Proveedor</Label>
            <Input
              type="select"
              name="codigoProvedor"
              id="codigoProvedor"
              className="custom-select"
              value={codigoProvedor}
              onChange={handleChange}>
              <option key={Math.random()} value={'nada'}></option>
              {proveedores.map(p => (
                <option key={p._id} value={p.codigo}>{p.nombre}</option>
              ))}
            </Input>
            <FormText>Seleccione proveedor</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              required
              placeholder="Tornillo"
              value={nombre}
              onChange={handleChange}
            />
            <FormText>Ingrese nombre del producto</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Descripcion</Label>
            <Input
              type="text"
              name="descripcion"
              id="descripcion"
              placeholder="Tornillo Tornillo Tornillo Tornillo Tornillo"
              value={descripcion}
              onChange={handleChange}
            />
            <FormText>Ingrese descripcion del producto</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Precio minorista</Label>
            <Input
              type="number"
              name="precio"
              id="precio"
              placeholder="$270"
              value={precio}
              onChange={handleChange}
            />
            <FormText>Ingrese precio minorista</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Precio mayorista</Label>
            <Input
              type="number"
              name="precioWholesaler"
              id="precioWholesaler"
              placeholder="$250"
              value={precioWholesaler}
              onChange={handleChange}
            />
            <FormText>Ingrese precio mayorista</FormText>
          </FormGroup>
          <FormGroup>
            <FileBase64
              name="imagen"
              id="imagen"
              value={imagen}
              multiple={false}
              onDone={handleChange} />
            <FormText>Seleccione imagen</FormText>
          </FormGroup>
          <hr></hr>
          <Button color="primary">Guardar</Button>
          <Button color="danger" onClick={toggle}>Cancelar</Button>
        </Form>
      </ModalBody>
      {/* <ModalFooter>
    </ModalFooter> */}
    </Modal>
  )
};

export default ModalNuevoProducto;
