import React from 'react';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalNuevoProveedor = ({ state, toggleProveedor, codProveedor, NomProveedor, submitFormProveedor, handleChangeProveedor }) => {
  return (
    <Modal fullscreen isOpen={state.modalProveedor} toggle={toggleProveedor}>
      <ModalHeader toggle={toggleProveedor}>Editar: Nombre producto</ModalHeader>
      <ModalBody>
        <Form className="form" onSubmit={submitFormProveedor}>
          <FormGroup>
            <Label># Codigo</Label>
            <Input
              type="number"
              name="codigo"
              id="codigo"
              placeholder="128"
              value={codProveedor}
              onChange={handleChangeProveedor}
            />
            <FormText>Ingrese codigo de proveedor</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Nombre Proveedor</Label>
            <Input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="PROVEEDOR"
              value={NomProveedor}
              onChange={handleChangeProveedor}
            />
            <FormText>Ingrese nombre de PROVEEDOR</FormText>
          </FormGroup>
          <hr></hr>
          <Button color="primary">Guardar</Button>
          <Button color="danger" onClick={toggleProveedor}>Cancelar</Button>
        </Form>
      </ModalBody>
      {/* <ModalFooter>
    </ModalFooter> */}
    </Modal>);
};

export default ModalNuevoProveedor;
