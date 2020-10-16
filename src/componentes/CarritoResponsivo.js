import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Carousel, { consts } from 'react-elastic-carousel';
import { Footer } from './Footer';
import Typography from '@material-ui/core/Typography';
import Row from 'react-bootstrap/Row';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CardHeader } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from "@material-ui/core/Button";
import Media from 'react-media';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import * as Constantes from '../componentes/Constantes';

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = Constantes.url_general;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class CarritoResponsivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productosencarrito: [],
            productossugeridos: [],
            mostrar_dialogo: false
        }
    }
    render() {
        return (
            <Route>
                <div>
                    <div style={{ padding: 15, borderBottom: '1px solid #dedede' }}>
                        <Typography>
                            <Link to={'/'}>Inicio</Link>
                            <span className="svg-wrapper">
                                <svg className="icono" style={{ width: 20 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                            </span> Mi Carrito
                    </Typography>
                    </div>
                    {this.state.mostrar == true ?
                        <>
                            <Media queries={{ small: { maxWidth: 380 } }}>
                                {matches =>
                                    matches.small ? (
                                        <Row style={{ width: '100%', overflowY: 'scroll', height: 290 }}>
                                            {this.state.productosencarrito.map((produ) => (
                                                <Card style={{ width: '100%', padding: 15, borderBottom: '1px solid #dedede', borderRadius: 0, boxShadow: 'none' }}>
                                                    <Row style={{ flexWrap: 'inherit' }}>
                                                        <Col sm={2}>
                                                            <CardMedia style={{ height: 88, width: 46, float: 'right' }} image={produ.Url}></CardMedia>
                                                        </Col>
                                                        <Col sm={7}>
                                                            <Typography>{produ.Des}</Typography>
                                                            <Row style={{ width: '100%', flexWrap: 'inherit', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0 }}>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItemCarrito(produ.Sku)}>-</button></Col>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3', fontSize: 20 }}>{produ.Cantidad}</label></Col>
                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItemCarrito(produ.Sku)}>+</button></Col>
                                                            </Row>
                                                        </Col>
                                                        <Col sm={3} style={{ padding: '21px 0px' }}>
                                                            <Typography> ${produ.Precio}.00</Typography>
                                                            <Button style={{ width: '10%' }} onClick={() => this.EliminarCarrito(produ.Sku)}>Eliminar</Button>

                                                        </Col>
                                                    </Row>
                                                </Card>
                                            ))}
                                        </Row>
                                    )
                                        :
                                        (
                                            <Row style={{ width: '100%', overflowY: 'scroll', height: 360 }}>
                                                {this.state.productosencarrito.map((produ) => (
                                                    <Card style={{ width: '100%', padding: 15, borderBottom: '1px solid #dedede', borderRadius: 0, boxShadow: 'none' }}>
                                                        <Row style={{ flexWrap: 'inherit' }}>
                                                            <Col sm={2}>
                                                                <CardMedia style={{ height: 88, width: 46, float: 'right' }} image={produ.Url}></CardMedia>
                                                            </Col>
                                                            <Col sm={7}>
                                                                <Typography>{produ.Des}</Typography>
                                                                <Row style={{ width: '100%', flexWrap: 'inherit', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0 }}>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItemCarrito(produ.Sku)}>-</button></Col>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3', fontSize: 20 }}>{produ.Cantidad}</label></Col>
                                                                    <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItemCarrito(produ.Sku)}>+</button></Col>
                                                                </Row>
                                                            </Col>
                                                            <Col sm={3} style={{ padding: '21px 0px' }}>
                                                                <Typography> ${produ.Precio}.00</Typography>
                                                                <Button style={{ width: '10%' }} onClick={() => this.EliminarCarrito(produ.Sku)}>Eliminar</Button>

                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                ))}
                                            </Row>
                                        )
                                }
                            </Media>
                            <Row style={{ justifyContent: 'center' }}>
                                <Button style={{ width: '90%', height: 60, position: 'absolute', bottom: 80 }} variant="outlined" color="primary">
                                    <Link to={'/'}>
                                        Continuar Comprando
                            </Link>
                                </Button>
                            </Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Button style={{ backgroundColor: '#10266b', width: '90%', height: '55px', position: 'absolute', bottom: 10 }} variant="contained" disableElevation>
                                    <Link style={{ color: '#ffffff' }} to={'/formulariocompra'}>
                                        Finalizar Compra
                        </Link>
                                </Button>
                            </Row>
                        </>
                        :
                        <>
                            <p>No tienes productos en tu carrito.</p>
                            <Row style={{ justifyContent: 'center' }}>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Button style={{ width: '90%', height: 60, position: 'absolute', bottom: 10 }} variant="outlined" color="primary">
                                        <Link to={'/'}>
                                            Continuar Comprando
                            </Link>
                                    </Button>
                                </Row>
                            </Row>
                        </>
                    }
                </div>
                {
                        this.state.mostrar_dialogo == true ?
                            <Dialog
                                open={this.state.open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={()=> this.handleClose()}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle id="alert-dialog-slide-title">{"Limite Excedido"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                       Actualmente solo puedes agregar un limite de 10 unidades para este producto.
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                   
                                    <Button onClick={() => this.handleClose()} color="primary">
                                        Aceptar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            : null
                    }

            </Route>
        )
    }
    componentDidMount() {
        if (localStorage.getItem("productosencarrito") != null) {

            this.CargarProductosSugeridos().then(result => {
                this.setState({
                    productossugeridos: result[0]
                }, () => { console.log("baby", this.state.productossugeridos) })
            })
            var e = localStorage.getItem("productosencarrito");
            console.log("pddd", JSON.parse(e));
            this.setState({
                productosencarrito: JSON.parse(e)
            }, () => {

                if (this.state.productosencarrito != null) {
                    this.setState({ mostrar: true })
                }
            })
        }
    }
    
    handleClose(){
        this.setState({
            open:false,
            mostrar_dialogo:false
        })
    }

    handleClickOpen(){
        this.setState({
            open:true,
            mostrar_dialogo:true
        })    
    }
    CargarProductosSugeridos() {
        var pro = [];
        const posturl = url_general + "api/Articulo/sugeridos";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (res) => res.json()
            )
                .catch(error => console.log('Error', error))
                .then(resp => {
                    pro.push(resp);
                    resolve(pro);
                })
        });

        return result;
    }

    EliminarCarrito(sku) {
        var array = this.state.productosencarrito;
        var index = array.findIndex(x => x.Sku === sku);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({
                productosencarrito: array
            }, () => {
                if (this.state.productosencarrito.length == 0) {
                    this.setState({
                        mostrar: false
                    });
                    localStorage.clear();
                }
                else {
                    localStorage.removeItem("productosencarrito");
                    localStorage.setItem("productosencarrito", JSON.stringify(this.state.productosencarrito))
                }
            })
        }
    }

    AgregarItemCarrito(sku) {

        const { productos: productosencarrito } = this.state;

        const productos = this.state.productosencarrito.map(item => {

            if (item.Sku === sku) {
               if (item.Cantidad > 9) {
                this.handleClickOpen();
               } else {
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
            }

            return item;
        });
        this.setState(productos);
        localStorage.setItem("productosencarrito", JSON.stringify(productos))
    }
    QuitarItemCarrito(sku) {

        const { productos: productosencarrito } = this.state;

        const productos = this.state.productosencarrito.map(item => {
            if (item.Sku === sku) {
                if (item.Cantidad === 1) {
                    item.Cantidad -= 1;
                    item.Precio = (item.Cantidad * item.Precio);
                    if (item.Cantidad < 1) {
                        this.EliminarCarrito(item.Sku);
                    }
                }
                else {
                    var punit = (item.Precio / item.Cantidad);
                    item.Cantidad -= 1;
                    item.Precio = (item.Cantidad * punit);
                    if (item.Cantidad < 1) {
                        this.EliminarCarrito(item.Sku);
                    }
                    console.log("entro", punit);
                }
                return item;
            }

            return item;
        });
        this.setState(productos);
        localStorage.setItem("productosencarrito", JSON.stringify(productos))
    }
}