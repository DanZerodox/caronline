import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect, Router } from "react-router-dom";
import { Footer } from './componentes/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "@material-ui/core/Button";
import Media from 'react-media';
import * as Constantes from './componentes/Constantes';


//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = Constantes.url_general;
export class Historico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compras: [],
            direccion: [],
            redirect: false
        }
    }
    render() {
        return (
            <Route>
                <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 1300 } }}>
                    {matches =>
                        matches.small ? (
                            <div style={{ justifyContent: 'center', padding: 15 }}>
                                <div style={{ height: 400, overflowY: 'scroll', width: '100%' }}>
                                    <h4>Mis Compras</h4>
                                    {this.state.compras.map(item => (
                                        <Card>
                                            <Typography style={{ fontWeight: 600 }}>Número de Pedido: {item.TickId}</Typography>
                                            <CardContent>
                                                <Row>
                                                    <Col>
                                                        <label style={{ color: 'rgb(16, 38, 107)' }}>Fecha de Solicitud: {item.TickFecha}</label>
                                                        <label style={{ color: 'rgb(26, 147, 73)' }}>Fecha de Entrega: {item.TickFechaEntrega}</label>
                                                    </Col>
                                                    <Col>
                                                        <label>Tipo de Entrega: {item.TickTipoEntregaDesc}</label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <label>Cantidad de Articulos: {item.TotalArts}</label>
                                                    </Col>
                                                    <Col>
                                                        <label>Total: ${item.TickTotal}.00</label>
                                                    </Col>
                                                </Row>
                                                <Row style={{ justifyContent: 'flex-end', marginRight: 10 }}>
                                                <Link to={'/detallepedido/' + item.TickId}>
                                                            <Button variant="contained" color="primary">Detalle</Button>
                                                </Link>                                                </Row>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ) :
                            (
                                <div style={{ marginTop:30, marginLeft: 260, marginBottom: 40 }}>
                                    <div style={{ height: 400, overflowY: 'scroll', width: '80%' }}>
                                        <h4>Mis Compras</h4>
                                        {this.state.compras.map(item => (
                                            <Card>
                                                <Typography style={{ fontWeight: 600 }}>Número de Pedido: {item.TickId}</Typography>
                                                <CardContent>
                                                    <Row>
                                                        <Col>
                                                            <Row style={{ color: 'rgb(16, 38, 107)' }}>
                                        <label>Fecha de Solicitud: {item.TickFecha[3]}{item.TickFecha[4]}/{item.TickFecha[0]}{item.TickFecha[1]}/{item.TickFecha[6]}{item.TickFecha[7]}{item.TickFecha[8]}{item.TickFecha[9]}</label>
                                                            </Row>
                                                            <Row style={{ color: 'rgb(26, 147, 73)' }}>
                                                                <label>Fecha de Entrega: {item.TickFechaEntrega[3]}{item.TickFechaEntrega[4]}/{item.TickFechaEntrega[0]}{item.TickFechaEntrega[1]}/{item.TickFechaEntrega[6]}{item.TickFechaEntrega[7]}{item.TickFechaEntrega[8]}{item.TickFechaEntrega[9]}</label>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            <label>Tipo de Entrega: {item.TickTipoEntregaDesc}</label>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <label>Cantidad de Articulos: {item.TotalArts}</label>
                                                        </Col>
                                                        <Col>
                                                            <label>Total: ${item.TickTotal}.00</label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ justifyContent: 'flex-end', marginRight: 10 }}>

                                                        <Link to={'/detallepedido/' + item.TickId}>
                                                            <Button variant="contained" color="primary">Detalle</Button>
                                                        </Link>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )
                    }
                </Media>
                <Footer></Footer>
            </Route>
        )
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.Historial(token).then(item => {
            this.setState({
                compras: item[0]
            }, () => { console.log(this.state.compras) })
        });
    }

    Detalle(Id) {
        localStorage.setItem("TicketId", Id);
    }

    Historial(token) {
        var pro = [];
        const posturl = url_general + "api/Carrito/compras";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(
                (res) => res.json()

            )
                .catch(error => console.log('Error', error))
                .then(resp => {
                    pro.push(resp);
                    resolve(pro);
                });
        });

        return result;
    }


}