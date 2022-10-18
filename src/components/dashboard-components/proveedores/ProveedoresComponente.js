import React, { useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getProveedores } from '../../../context/Proveedor';
import { useProveedorDispatch, useProveedorState } from '../../../context/Proveedor';

const Proveedores = () => {

  const { providers } = useProveedorState();
  const dispatch = useProveedorDispatch();
  useEffect(() => {
    getProveedores(dispatch)
  }, []);


  return(
    <Card>
      <CardBody>
      

      </CardBody>
    </Card>
  );
};

export default Proveedores;

