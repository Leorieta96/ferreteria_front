import React from 'react';
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalActualizarPrecios = ({ state, togglePrice, increment, proveedores, submitFormIncrement, handleChangePrice }) => {
  return (
    <Modal fullscreen isOpen={state.modalPrice} toggle={togglePrice}>
      <ModalHeader toggle={togglePrice}>Editar: Nombre producto</ModalHeader>
      <ModalBody>
        <Form className="form" onSubmit={submitFormIncrement}>
          <FormGroup>
            <Label>Proveedor</Label>
            <Input
              type="select"
              name="codigo"
              id="codigo"
              className="custom-select"
              value={increment.codigo}
              onChange={handleChangePrice}>
              <option key={Math.random()} value={''}></option>
              {proveedores.map(p => (
                <option key={p._id} value={p.codigo}>{p.nombre}</option>
              ))}
            </Input>
            <FormText>Seleccione proveedor</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Seleccione el tipo de precio</Label>
            <Input
              type="select"
              name="type"
              id="type"
              className="custom-select"
              value={increment.type}
              onChange={handleChangePrice}>
              <option key={Math.random()} value='precio'>Precio Capital</option>
              <option key={Math.random()} value='precioWholesaler'>Precio Interior</option>
              <option key={Math.random()} value='ambos'>Ambos</option>

            </Input>
            <FormText>Seleccione proveedor</FormText>
          </FormGroup>
          <FormGroup>
            <Label>Incremento (%)</Label>
            <Input
              type="number"
              name="aumento"
              id="aumento"
              placeholder="10"
              value={increment.aumento}
              onChange={handleChangePrice}
            />
            <FormText>Ingrese porcentaje de incremento</FormText>
          </FormGroup>
          <hr></hr>
          <Button color="primary">Guardar</Button>
          <Button color="danger" onClick={togglePrice}>Cancelar</Button>
        </Form>
      </ModalBody>
      {/* <ModalFooter>
    </ModalFooter> */}
    </Modal>
  );
};

export default ModalActualizarPrecios;
