import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { BrowserRouter, Route, Link, Redirect, Router } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Constantes from '../componentes/Constantes';
import Button from "@material-ui/core/Button";
import Media from 'react-media';
import { Footer } from '../componentes/Footer';

var url_general = Constantes.url_general;

export class DetallePedido extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketid: props.match.params.id,
            productos: []
        }
    }
    render() {
        return (
            <Route>
                <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 1300 } }}>
                    {
                        matches =>
                            matches.small ? (
                                <div style={{ padding: '30px 10px', overflowY: 'scroll' }}>
                                    <h3>Pedido: #{this.state.ticketid}</h3>
                                    {this.state.productos.map(item => (
                                        item.Articulos.map(pro => (
                                            <Card style={{ width: '100%', marginBottom: 10 }}>
                                                <Row style={{width:'80%'}}>
                                                    <Col>
                                                        <CardMedia style={{ height: 90, width: 60, backgroundPositionX: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} image={Constantes.url_general + "Content/Assets/Images/" + pro.ArtSku + ".png"}></CardMedia>
                                                    </Col>
                                                    <Col>
                                                        <Row>
                                                            <Typography style={{ color: 'rgb(26, 147, 73)' }}>Sku: {pro.ArtSku}</Typography>
                                                        </Row>
                                                        <Row>
                                                            <label>Cantidad: {pro.TickDetCant} Unidad: {pro.ArtUnidad}</label>
                                                        </Row>
                                                        <Row>
                                                            <label>SubTotal: ${pro.TickDetSubTotal}.00</label>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        ))
                                    )

                                    )}
                                    <Link to={'/historico'}>
                                        <Button variant="contained" color="primary">Regresar</Button>
                                    </Link>
                                </div>
                            ) :
                                (
                                    <div style={{ padding: '40px 290px', overflowY: 'scroll' }}>
                                        <h3>Pedido: #{this.state.ticketid}</h3>
                                        {this.state.productos.map(item => (
                                            item.Articulos.map(pro => (
                                                <Card style={{ width: '100%', marginBottom: 10 }}>
                                                    <Row>
                                                        <Col sm={4}>
                                                            <CardMedia style={{ height: 90, width: 60, backgroundPositionX: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} image={Constantes.url_general + "Content/Assets/Images/" + pro.ArtSku + ".png"}></CardMedia>
                                                        </Col>
                                                        <Col sm={8}>
                                                            <Row>
                                                                <Typography style={{ color: 'rgb(26, 147, 73)' }}>Sku: {pro.ArtSku}</Typography>
                                                            </Row>
                                                            <Row>
                                                                <label>Cantidad: {pro.TickDetCant} Unidad: {pro.ArtUnidad}</label>
                                                            </Row>
                                                            <Row>
                                                                <label>SubTotal: ${pro.TickDetSubTotal}.00</label>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            ))
                                        )

                                        )}
                                        <Link to={'/historico'}>
                                            <Button variant="contained" color="primary">Regresar</Button>
                                        </Link>
                                    </div>
                                )
                    }
                </Media>
                <Footer></Footer>
            </Route>
        );
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        this.ConsultarCarrito(token).then(item => {
            this.setState({ productos: item })
        });
    }

    ConsultarCarrito(token) {
        var pro = [];
        const posturl = url_general + "api/Carrito/consultar/" + this.state.ticketid;
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