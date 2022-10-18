import React from 'react';
import { Col, Row } from 'reactstrap';
import ProveedoresComponente from '../../components/dashboard-components/proveedores/ProveedoresComponente'

const Proveedores = () => {
    return (
        <div>
            <Row>
                <Col sm={12}>
                    <ProveedoresComponente />
                </Col>
            </Row>
        </div>
    )
};

export default Proveedores;
