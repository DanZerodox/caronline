import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Footer } from './componentes/Footer';
import Media from 'react-media';
import CardMedia from "@material-ui/core/CardMedia";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "@material-ui/core/Button";

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = "https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class ResumenCompra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arreglo: [],
            direccion: [],
            mostrar: false,
            tipo_entrega: 0
        }
    }
    render() {
        return (
            <Route>
                {this.state.mostrar == false ?
                    <>
                        <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 1300 }, large: { maxWidth: 1600 } }}>
                            {matches =>
                                matches.small ? (
                                    <div>
                                        <Card style={{ width: '100%', boxShadow: '0 0 black' }}>
                                            <CardContent>
                                                <h2 class="direccion-title">Resumen de tu pedido</h2>
                                                <div class="morty-resumen">
                                                    {this.state.arreglo.map(item2 => (
                                                         item2.Articulos.map(item =>(
                                                            <>
                                                            <Card>
                                                                <Row>
                                                                    <Col xs={2}>
                                                                        <CardMedia style={{ width: 75, height: 130 }} image={url_general + "Content/Assets/Images/" + item.ArtSku + ".png"}></CardMedia>
                                                                    </Col>
                                                                    <Col xs={10} style={{ padding: 24 }}>
                                                                        <Typography style={{ fontSize: '1rem', fontWeight: 600 }}>{item.ArtDesTv}</Typography>
                                                                        <Typography style={{ color: 'rgb(26, 147, 73)' }}>SKU: {item.ArtSku}</Typography>
                                                                        <Typography style={{ fontSize: '1rem', width:'40%', float:'right'}}>{item.TickDetCant} Cajas</Typography>
                                                         <Typography style={{ fontSize: '1rem', width:'45%'}}>Total: ${item.TickDetSubTotal}.00</Typography>
   
                                                                        <ul style={{ display: 'flex' }}>
                                                                            <li><a href="#">Productos Jumex</a></li>
                                                                            <li><a class="parte-title-bajo" href="#">Detalle</a></li>
                                                                            {/* <li class="li-articulo"><a class="parte-title-bajo" href="#">Mis Favoritos</a></li> */}
                                                                        </ul>
                                                                    </Col>
                                                                    
                                                                   
                                                                </Row>
                                                            </Card>
                                                        </>
                                                         )
                                                    )))}

                                                </div>
                                                <div class="editar-direccion">
                                                    {this.state.tipo_entrega == 0 ?
                                                        this.state.direccion.map(dir => (
                                                            <ul class="panel-direccion">
                                                                <li style={{width:'100%'}} class="li-direccion-final-resumen">
                                                                    <div class="direccion-primer">Dirección de entrega</div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">{dir.Direccion + " - " + dir.Municipio + ", " + dir.Estado}</span>
                                                                    </div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">{dir.Colonia + ", C.P. " + dir.CP + " - " + dir.Referencia}</span>
                                                                    </div>

                                                                </li>

                                                            </ul>
                                                        ))
                                                        :
                                                        <ul class="panel-direccion">
                                                            <li class="li-direccion-final-resumen">
                                                                <div class="direccion-primer">Dirección de entrega</div>
                                                                <div class="direccion-segundo">
                                                                    <span class="direccion-mun-col">En oficina</span>
                                                                </div>
                                                                <div class="direccion-segundo">
                                                                    <span class="direccion-mun-col">Xalostoc</span>
                                                                </div>

                                                            </li>

                                                        </ul>
                                                    }

                                                </div>
                                                <Link to={"/contenidocarrito"}>
                                                    <button class="btncancel-resumen">Cancelar</button>
                                                </Link>
                                                <button class="btnfin-resumen" onClick={() => this.FinalizarPedido()}>Finalizar</button>
                                            </CardContent>
                                        </Card>

                                    </div>
                                )
                                    : (matches.medium ? (
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Card style={{ width: '70%', boxShadow: '0 0 black' }}>
                                                <CardContent>
                                                    <h2 class="direccion-title">Resumen de tu pedido</h2>
                                                    <div class="morty-resumen">
                                                        {this.state.arreglo.map(item => (
                                                            item.Articulos.map(item2 => (
                                                                <>
                                                                    <Card>
                                                                        <Row>
                                                                            <Col sm={2}>
                                                                                <CardMedia style={{ width: 75, height: 130, float: 'right' }} image={url_general + "Content/Assets/Images/" + item2.ArtSku + ".png"}></CardMedia>
                                                                            </Col>
                                                                            <Col sm={5} style={{ padding: 18 }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>{item2.ArtDesTv}</Typography>
                                                                                <Typography style={{ color: 'rgb(26, 147, 73)' }}>SKU: {item2.ArtSku}</Typography>
                                                                                <ul style={{ display: 'flex' }}>
                                                                                    <li><a href="#">Mas productos de Jumex</a></li>
                                                                                    <li><a class="parte-title-bajo" href="#">Detalle</a></li>
                                                                                    {/* <li class="li-articulo"><a class="parte-title-bajo" href="#">Mis Favoritos</a></li> */}
                                                                                </ul>
                                                                            </Col>
                                                                            <Col sm={2} style={{ padding: '50px 15px' }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>{item2.TickDetCant} Cajas</Typography>
                                                                            </Col>
                                                                            <Col sm={3} style={{ padding: 48 }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>Total: ${item2.TickDetSubTotal}.00</Typography>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </>
                                                            ))
                                                        ))}

                                                    </div>
                                                    <div class="editar-direccion">
                                                        {this.state.tipo_entrega == 0 ?
                                                            this.state.direccion.map(dir => (
                                                                <ul class="panel-direccion">
                                                                    <li class="li-direccion-final-resumen">
                                                                        <div class="direccion-primer">Dirección de entrega</div>
                                                                        <div class="direccion-segundo">
                                                                            <span class="direccion-mun-col">{dir.Direccion + " - " + dir.Municipio + ", " + dir.Estado}</span>
                                                                        </div>
                                                                        <div class="direccion-segundo">
                                                                            <span class="direccion-mun-col">{dir.Colonia + ", C.P. " + dir.CP + " - " + dir.Referencia}</span>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            ))
                                                            :
                                                            <ul class="panel-direccion">
                                                                <li class="li-direccion-final-resumen">
                                                                    <div class="direccion-primer">Dirección de entrega</div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">En oficina</span>
                                                                    </div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">Xalostoc</span>
                                                                    </div>

                                                                </li>

                                                            </ul>
                                                        }

                                                    </div>
                                                    <Link to={"/contenidocarrito"}>
                                                        <button class="btncancel-resumen">Cancelar</button>
                                                    </Link>
                                                    <button class="btnfin-resumen" onClick={() => this.FinalizarPedido()}>Finalizar</button>
                                                </CardContent>
                                            </Card>

                                        </div>
                                    )
                                        : (
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Card style={{ width: '70%', boxShadow: '0 0 black' }}>
                                                <CardContent>
                                                    <h2 class="direccion-title">Resumen de tu pedido</h2>
                                                    <div class="morty-resumen">
                                                        {this.state.arreglo.map(item => (
                                                            item.Articulos.map(item2 => (
                                                                <>
                                                                    <Card>
                                                                        <Row>
                                                                            <Col sm={2}>
                                                                                <CardMedia style={{ width: 75, height: 130, float: 'right' }} image={url_general + "Content/Assets/Images/" + item2.ArtSku + ".png"}></CardMedia>
                                                                            </Col>
                                                                            <Col sm={5} style={{ padding: 18 }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>{item2.ArtDesTv}</Typography>
                                                                                <Typography style={{ color: 'rgb(26, 147, 73)' }}>SKU: {item2.ArtSku}</Typography>
                                                                                <ul style={{ display: 'flex' }}>
                                                                                    <li><a href="#">Mas productos de Jumex</a></li>
                                                                                    <li><a class="parte-title-bajo" href="#">Detalle</a></li>
                                                                                    {/* <li class="li-articulo"><a class="parte-title-bajo" href="#">Mis Favoritos</a></li> */}
                                                                                </ul>
                                                                            </Col>
                                                                            <Col sm={2} style={{ padding: '50px 15px' }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>{item2.TickDetCant} Cajas</Typography>
                                                                            </Col>
                                                                            <Col sm={3} style={{ padding: 48 }}>
                                                                                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>Total: ${item2.TickDetSubTotal}.00</Typography>
                                                                            </Col>
                                                                        </Row>
                                                                    </Card>
                                                                </>
                                                            ))
                                                        ))}

                                                    </div>
                                                    <div class="editar-direccion">
                                                        {this.state.tipo_entrega == 0 ?
                                                            this.state.direccion.map(dir => (
                                                                <ul class="panel-direccion">
                                                                    <li class="li-direccion-final-resumen">
                                                                        <div class="direccion-primer">Dirección de entrega</div>
                                                                        <div class="direccion-segundo">
                                                                            <span class="direccion-mun-col">{dir.Direccion + " - " + dir.Municipio + ", " + dir.Estado}</span>
                                                                        </div>
                                                                        <div class="direccion-segundo">
                                                                            <span class="direccion-mun-col">{dir.Colonia + ", C.P. " + dir.CP + " - " + dir.Referencia}</span>
                                                                        </div>

                                                                    </li>

                                                                </ul>
                                                            ))
                                                            :
                                                            <ul class="panel-direccion">
                                                                <li class="li-direccion-final-resumen">
                                                                    <div class="direccion-primer">Dirección de entrega</div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">En oficina</span>
                                                                    </div>
                                                                    <div class="direccion-segundo">
                                                                        <span class="direccion-mun-col">Xalostoc</span>
                                                                    </div>

                                                                </li>

                                                            </ul>
                                                        }

                                                    </div>
                                                    <Link to={"/contenidocarrito"}>
                                                        <button class="btncancel-resumen">Cancelar</button>
                                                    </Link>
                                                    <button class="btnfin-resumen" onClick={() => this.FinalizarPedido()}>Finalizar</button>
                                                </CardContent>
                                            </Card>

                                        </div>
                                        )
                                    )
                            }
                        </Media>
                    </>
                    :
                    <div className='primer-panel'>
                        <Card>
                            <CardContent>
                                <div class="mensajefinal">
                                    <img class="circlegreen" src={require('./images/Jumex/ok.png')}></img>
                                    <p>Se ha confirmado tu compra, podrás dar seguimiento <Link to={'/historico'}>Aquí</Link> o desde el chat bot, Gracias por tu preferencia.</p>
                                    <Link to={'/'}><p>Ir a Inicio</p></Link>
                                    <img class="circlegreen" src={require('./images/Jumex/tucan.png')}></img>
                                </div>
                            </CardContent>
                        </Card>
                        {/* <Footer></Footer> */}
                    </div>
                }
                <Footer></Footer>
            </Route>
        )
    }

    componentDidMount() {
        var token = localStorage.getItem("token");
        var direccion_id = localStorage.getItem("direccion_id");
        var tipo_entrega = localStorage.getItem("tipo_entrega");
        this.setState({ tipo_entrega: tipo_entrega });
        this.ConsultarCarrito(token).then(item => {
            var e = localStorage.getItem("productosencarrito");
           const datos=[];
           this.setState({arreglo:item},()=>{
               console.log(this.state.arreglo);
               this.state.arreglo.map(a=>{
                a.Articulos.map(item2=>{         
                    var item={"Sku":item2.ArtSku, "Url": url_general+'Content/Assets/Images/'+item2.ArtSku+'.png',"Des":item2.ArtDesTv, "Cantidad":item2.TickDetCant, "Precio":Number(item2.TickDetSubTotal), "BD":item2.TickDetCant,"carga":true}
                    datos.push(item2);
                })
               });
        //        this.setState({arreglo:datos[0]},()=>{
        //            console.log(this.state.arreglo);
        //         if (tipo_entrega == 0) {
        //             // this.ConsultarDireccion(token,direccion_id).then(result=>{
        //             //     this.setState({
        //             //         direccion:result
        //             //     },()=>{console.log(this.state.direccion)})
        //             // })
        //             var e = localStorage.getItem("direccion_objeto");
        //             this.setState({
        //                 direccion: JSON.parse(e)
        //             })

        //         }
        //    })
           });
          
        })


    }

    FinalizarPedido() {
        this.CerrarPedido(localStorage.getItem("token"), localStorage.getItem("direccion_id"));
        this.setState({
            mostrar: true
        });
        localStorage.removeItem("productosencarrito");
        localStorage.setItem("compras", JSON.stringify(this.state.arreglo));
        localStorage.setItem("direccion", this.state.direccion);
    }

    CerrarPedido(token, direccion_id) {
        console.log(token);
        var posturl = "";
        if (localStorage.getItem("tipo_entrega") == 0) {
            posturl = url_general + "api/Carrito/confirmar/0/"+direccion_id;
        }
        else {
            posturl = url_general + "api/Carrito/confirmar/1";
        }
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
                .catch(error => console.log('Error', error));
        });

        return result;
    }

    ConsultarDireccion(token, direccion_id) {
        console.log(token);
        var pro = [];
        const posturl = url_general + "api/Usuario/direccion/" + direccion_id;
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'POST',
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
                    resolve(resp);
                });
        });

        return result;
    }

    ConsultarCarrito(token) {
        var pro = [];
        const posturl = url_general + "api/Carrito/consultar";
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