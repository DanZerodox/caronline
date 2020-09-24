import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Footer } from './componentes/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-media';
import Button from "@material-ui/core/Button";


//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = "https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class ContenidoCarrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cantidadtitulo: 0,
            productosencarrito: [],
            mostrar: false,
            token: '',
            mensaje: [],
            redirect: false,
            total: ''
        }
    }
    render() {
        return (
            <Route>
                <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 1300 }, large: { maxWidth: 1600 } }}>
                    {matches =>
                        matches.small ? (
                            <>
                            <div style={{ padding: 15, textAlign: 'center', borderBottom: '1px solid #dedede' }}>
                                <Typography>
                                        Mi Carrito ({this.state.cantidadtitulo})
                                </Typography>
                            </div>
                            <Row style={{width:'100%'}}>
                                {this.state.productosencarrito.map((produ)=>(
                                    <Card style={{ width: '100%', padding: 15, borderBottom: '1px solid #dedede', borderRadius: 0, boxShadow: 'none' }}>
                                    <Row style={{ flexWrap: 'inherit' }}>
                                        <Col sm={2}>
                                            <CardMedia style={{ height: 88, width: 46, float:'right' }} image={produ.Url}></CardMedia>
                                        </Col>
                                        <Col sm={7}>
                                            <Typography>{produ.Des}</Typography>
                                            <Row style={{ width: '100%', flexWrap: 'inherit', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0 }}>
                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItem(produ.Sku)}>-</button></Col>
                                                <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3', fontSize: 20 }}>{produ.Cantidad}</label></Col>
                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItem(produ.Sku)}>+</button></Col>
                                            </Row>
                                        </Col>
                                        <Col sm={3} style={{ padding: '21px 0px' }}>
                                            <Typography> ${produ.Precio}.00</Typography>
                                            <a onClick={() => this.EliminarArticulo(produ.Sku)} href="#">Eliminar</a>
                                        </Col>
                                    </Row>
                                </Card>
                                ))}
                            </Row>
                           
                            <div style={{textAlign:'center'}}>
                            <Typography style={{ padding: 30, fontSize: '2rem' }}>Total: ${this.state.total}.00</Typography>
                                <Button style={{backgroundColor: '#10266b', width: '70%', height: 60}} variant="outlined" onClick={()=>this.RegistrarArticulos()}>
                                    <label style={{color:'#ffffff'}}>Continuar Comprando</label>                                        
                                </Button>
                            </div>
                            </>
                        )
                            :
                            (
                                matches.medium ? (
                                    <>
                                        <Card style={{ boxShadow: '0 0 black', textAlign: 'center' }}>
                                            <Typography style={{ fontSize: '1.5rem', borderBottom: '1px solid #dedede', boxShadow: '0 0 8px rgba(0,0,0,.12)', padding: 10 }}>Mi Carrito({this.state.cantidadtitulo})</Typography>
                                            {this.state.productosencarrito.map((item) => (
                                                <CardContent style={{ borderBottom: '1px solid #dedede' }}>
                                                    <Row>
                                                        <Col sm={2}>
                                                            <CardMedia style={{
                                                                height: 170,
                                                                backgroundSize: 'contain',
                                                                backgroundPositionX: 'center',
                                                                backgroundRepeat: 'no-repeat'
                                                            }} image={item.Url}></CardMedia>
                                                        </Col>
                                                        <Col sm={4} style={{ padding: 15 }}>
                                                            <Typography style={{ fontSize: '1.4rem', textAlign: 'left' }}>{item.Des}</Typography>
                                                            <Typography style={{ fontSize: '1.3rem', color: "#1a9349", fontWeight: "bold", textAlign: 'left' }}>Sku: {item.Sku}</Typography>
                                                            <br></br>
                                                            <br></br>
                                                            <ul style={{ display: 'flex', justifyContent: 'space-around', float: 'left', width: '101%' }}>
                                                                <Link to={'/'}>
                                                                    <li>
                                                                        <a href="#">Mas productos de Jumex</a>
                                                                    </li>
                                                                </Link>

                                                                <li class="parte-title-bajo"><a href="#">Detalle</a></li>
                                                                <li><a onClick={() => this.EliminarArticulo(item.Sku)} class="parte-title-bajo" href="#">Eliminar</a></li>

                                                            </ul>
                                                        </Col>
                                                        <Col sm={4}>
                                                            <Row style={{ width: '100%', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0, flexWrap: 'inherit', marginTop: 50 }}>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItem(item.Sku)}>-</button></Col>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3.5', fontSize: 20 }}>{item.Cantidad} Cajas</label></Col>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItem(item.Sku)}>+</button></Col>
                                                            </Row>
                                                        </Col>
                                                        <Col sm={2}>
                                                            <Typography style={{ fontSize: '3rem' }}>${item.Precio}.00</Typography>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            ))}
                                        </Card>
                                        <Card style={{ boxShadow: '0 0 black' }}>
                                            <Typography style={{ padding: 30, float: 'right', fontSize: '2rem' }}>Total: ${this.state.total}.00</Typography>
                                        </Card>
                                        <Card>
                                            <Button style={{ backgroundColor: '#10266b', height: 70, float: 'right', marginRight: 26 }} onClick={()=>this.RegistrarArticulos()} variant="contained" color="primary" disableElevation>Continuar Compra</Button>
                                        </Card>
                                    </>
                                ) : (
                                        <>
                                            <Card style={{ boxShadow: '0 0 black', textAlign: 'center' }}>
                                                <Typography style={{ fontSize: '1.5rem', borderBottom: '1px solid #dedede', boxShadow: '0 0 8px rgba(0,0,0,.12)', padding: 10 }}>Mi Carrito({this.state.cantidadtitulo})</Typography>
                                                {this.state.productosencarrito.map((item) => (
                                                    <CardContent style={{ borderBottom: '1px solid #dedede' }}>
                                                        <Row>
                                                            <Col sm={3}>
                                                                <CardMedia style={{
                                                                    height: 170,
                                                                    backgroundSize: 'contain',
                                                                    backgroundPositionX: 'center',
                                                                    backgroundRepeat: 'no-repeat'
                                                                }} image={item.Url}></CardMedia>
                                                            </Col>
                                                            <Col sm={4} style={{ padding: 20 }}>
                                                                <Typography style={{ fontSize: '1.4rem', textAlign: 'left' }}>{item.Des}</Typography>
                                                                <Typography style={{ fontSize: '1.3rem', color: "#1a9349", fontWeight: "bold", textAlign: 'left' }}>Sku: {item.Sku}</Typography>
                                                                <br></br>
                                                                <br></br>
                                                                <ul style={{ display: 'flex', justifyContent: 'space-around', float: 'left' }}>
                                                                    <Link to={'/'}>
                                                                        <li>
                                                                            <a href="#">Mas productos de Jumex</a>
                                                                        </li>
                                                                    </Link>

                                                                    <li class="parte-title-bajo"><a href="#">Detalle</a></li>
                                                                    <li><a onClick={() => this.EliminarArticulo(item.Sku)} class="parte-title-bajo" href="#">Eliminar</a></li>

                                                                </ul>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <Row style={{ width: '80%', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0, flexWrap: 'inherit', marginTop: 50 }}>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItem(item.Sku)}>-</button></Col>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3.5', fontSize: 20 }}>{item.Cantidad} Cajas</label></Col>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItem(item.Sku)}>+</button></Col>
                                                                </Row>
                                                            </Col>
                                                            <Col sm={2}>
                                                                <Typography style={{ fontSize: '3rem' }}>${item.Precio}.00</Typography>
                                                            </Col>
                                                        </Row>
                                                    </CardContent>
                                                ))}
                                            </Card>
                                            <Card style={{ boxShadow: '0 0 black' }}>
                                                <Typography style={{ padding: 30, float: 'right', fontSize: '2rem' }}>Total: ${this.state.total}.00</Typography>
                                            </Card>
                                            <Card>
                                                <Button style={{ backgroundColor: '#10266b', height: 70, float: 'right', marginRight: 26 }} variant="contained" onClick={()=>this.RegistrarArticulos()} color="primary" disableElevation>Continuar Compra</Button>
                                            </Card>
                                        </>
                                    )
                            )
                    }
                </Media>

                <Footer></Footer>
                {this.state.redirect==true?
                    <Redirect push to={'/direcciones'}></Redirect>
                    :null
                }
            </Route>
        )
    }

    componentDidMount() {
        console.log(window.innerHeight);
        if (localStorage.getItem("token") != null) {
            this.setState({ token: localStorage.getItem("token") })
            if (localStorage.getItem("productosencarrito") != null) {

                var e = localStorage.getItem("productosencarrito");

                console.log("pddd", JSON.parse(e));
                this.setState({
                    productosencarrito: JSON.parse(e),
                }, () => {
                    var total = 0;
                    for (var i = 0; i < this.state.productosencarrito.length; i++) {
                        total = (total + this.state.productosencarrito[i].Precio)
                    }
                    console.log("mi precio", total);
                    this.setState({
                        cantidadtitulo: this.state.productosencarrito.length,
                        total: total
                    })
                })
            }
        }
    }

    AgregarItem(sku) {
        const { productos: productosencarrito } = this.state;
        const productos = this.state.productosencarrito.map(item => {

            if (item.Sku === sku) {
                if (item.Cantidad === 1) {
                    item.Cantidad += 1;
                    item.Precio = (item.Cantidad * item.Precio)

                }
                else {
                    var punit = (item.Precio / item.Cantidad);
                    item.Cantidad += 1;
                    item.Precio = (item.Cantidad * punit)
                    console.log("entro", punit)
                }

                return item;
            }

            return item;
        });
        this.setState(productos);
        var total = 0;
        for (var i = 0; i < this.state.productosencarrito.length; i++) {
            total = (total + this.state.productosencarrito[i].Precio)
        }
        console.log("mi precio", total);
        this.setState({
            cantidadtitulo: this.state.productosencarrito.length,
            total: total
        })
        localStorage.setItem("productosencarrito", JSON.stringify(productos))
    }
    QuitarItem(sku) {
        const { productos: productosencarrito } = this.state;

        const productos = this.state.productosencarrito.map(item => {
            if (item.Sku === sku) {
                if (item.Cantidad === 1) {
                    item.Cantidad -= 1;
                    item.Precio = (item.Cantidad * item.Precio)
                }
                else {
                    var punit = (item.Precio / item.Cantidad);
                    item.Cantidad -= 1;
                    item.Precio = (item.Cantidad * punit)
                    console.log("entro", punit)
                }
                return item;
            }

            return item;
        });
        this.setState(productos);
        var total = 0;
        for (var i = 0; i < this.state.productosencarrito.length; i++) {
            total = (total + this.state.productosencarrito[i].Precio)
        }
        console.log("mi precio", total);
        this.setState({
            cantidadtitulo: this.state.productosencarrito.length,
            total: total
        })
        localStorage.setItem("productosencarrito", JSON.stringify(productos))

    }
    EliminarArticulo(sku) {
        var array = this.state.productosencarrito;
        var index = array.findIndex(x => x.Sku === sku);
        if (index !== -1) {
            var total = (this.state.total - array[index].Precio);

            array.splice(index, 1);
            this.setState({
                productosencarrito: array,
                total: total
            }, () => {
                if (this.state.productosencarrito.length == 0) {
                    this.setState({
                        mostrar: true
                    });
                    localStorage.removeItem("productosencarrito");
                }
                else {
                    localStorage.removeItem("productosencarrito");
                    localStorage.setItem("productosencarrito", JSON.stringify(this.state.productosencarrito))
                }
            })
        }
    }
    RegistrarArticulos() {
        this.InsertarProductos(this.state.token).then(item => {
            this.setState({
                mensaje: item
            }, () => {
                if (this.state.mensaje.Estatus == "OK" || this.state.mensaje.Mensaje == "Existe una compra pendiente, no pudes iniciar otra") {
                    this.setState({
                        redirect: true
                    })
                }
            })
        });


    }
    InsertarProductos(token) {
        var data = [];
        this.state.productosencarrito.map(item => {
            data.push({
                'ArtSku': item.Sku,
                'ArtCant': item.Cantidad,
                'ArtUnidad': 'Caja'
            })

        });
        console.log("si se pdo", data);

        const posturl = url_general + "api/Carrito/agregar";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(
                (res) => res.json()
            )
                .catch(error => console.log('Error', error))
                .then(resp => {

                    resolve(resp);
                });

        });
        return result;
    }

}