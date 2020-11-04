import React from 'react';
import { render } from 'react-dom';
import { HeadTop } from './componentes/HeadTop';
import { HeadBanner } from './componentes/HeadBanner';
import { Banner } from './componentes/Banner';
import { Productos } from './componentes/Productos';
import { Footer } from './componentes/Footer';
import { BrowserRouter, Route, Link, Redirect, HashRouter } from "react-router-dom";
import Carousel, { consts } from 'react-elastic-carousel';
import { BarraInicio } from './componentes/BarraInicio';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CardHeader } from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Media from 'react-media';
import { Carusel } from './componentes/Carusel';
import * as Constantes from './componentes/Constantes';


var url_general = Constantes.url_general;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const imagen_principal = {
    height: 360,
    width: 212,
    float: 'right'
};

const lineHeight = {
    lineHeight: '1.8'
}

function refreshPage() {
    // window.location.reload();
    //   this.props.history.push('/detalleproducto/100914')
}

export class DetalleProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            productodetalle: [],
            cantidad: 1,
            productosencarrito: [],
            mostrar: false,
            productossugeridos: [],
            mostrarresponsive: false,
            height: 0,
            width: 0,
            marginLeft: 0,
            redirigir: false,
            mostrar_dialogo: false,
            open: false
        }
    }

    render() {
        console.log(this.state.id);
        return (
            <HashRouter>
                <Route>
                    <div>
                        <BarraInicio></BarraInicio>
                        <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 900 }, large: { maxWidth: 1200 } }}>
                            {matches =>
                                matches.small ? (
                                    <>
                                        <Card style={{ overflow: 'unset' }}>
                                            <CardMedia style={{ height: 360, width: 359, backgroundPositionX: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }} image={url_general + "Content/Assets/Images/" + this.state.id + ".png"}></CardMedia>
                                        </Card>

                                        <div style={{ display: 'flow-root', width: '100%', flexWrap: 'inherit', padding: '4% 6%' }}>
                                            {this.state.productodetalle.map((item) => (
                                                item.ArtSku == this.state.id ?
                                                    <Card style={{ overflow: 'unset', boxShadow: 'none' }}>
                                                        <Typography style={{ lineHeight: '1.8' }} variant="h5" component="h2">{item.ArtDesTv}</Typography>
                                                        <Typography style={{ color: '#ffaf02', fontSize: '1.3em', lineHeight: '1.8' }}>SKU: {item.ArtSku}</Typography>
                                                        <Typography style={{ color: '#555', fontSize: '.85em', lineHeight: '1.8' }}>PRECIO POR CAJA</Typography>
                                                        <Typography variant="h4" component="h2">${item.ArtPVenta}.00</Typography>
                                                        <Typography style={{ color: '#555', fontSize: '.85em', lineHeight: '1.8' }}>Vendido por <Link to="/">{item.ArtMar}</Link></Typography>
                                                        <Row style={{ width: '100%', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0, flexWrap: 'inherit' }}>
                                                            <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItem()}>-</button></Col>
                                                            <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '3.5', fontSize: 20 }}>{this.state.cantidad} Cajas</label></Col>
                                                            <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItem()}>+</button></Col>
                                                        </Row>
                                                        <Button style={{ width: '100%', height: 60 }} variant="outlined" color="primary" onClick={() => this.AgregarCarritoResponsive(item.ArtSku, item.ArtDesTv, item.ArtPVenta)}>
                                                            Agregar
                                                        </Button>
                                                        {this.state.mostrarresponsive == true ?
                                                            <Redirect push to={'/carritoresponsive'}></Redirect>
                                                            : null
                                                        }
                                                    </Card>
                                                    : null
                                            ))}
                                        </div>
                                        <Footer></Footer>
                                    </>
                                ) : (
                                        matches.medium ? (
                                            <p>soy mediano</p>
                                        ) :
                                            (
                                                <Row>
                                                    <Col sm={8} style={{ overflowY: 'auto', height: 'calc(100vh - 24px - 52px - 40px)' }}>
                                                        <Row>
                                                            <Col sm={4}>
                                                                <Card style={{ overflow: 'unset' }}>
                                                                    <CardMedia style={imagen_principal} image={url_general + "Content/Assets/Images/" + this.state.id + ".png"}></CardMedia>
                                                                </Card>
                                                            </Col>
                                                            <Col sm={7}>
                                                                {this.state.productodetalle.map((item) => (
                                                                    item.ArtSku == this.state.id ?
                                                                        <Card style={{ overflow: 'unset', boxShadow: 'none' }}>
                                                                            <Typography style={{ lineHeight: '1.8' }} variant="h5" component="h2">{item.ArtDesTv}</Typography>
                                                                            <Typography style={{ color: '#ffaf02', fontSize: '1.3em', lineHeight: '1.8' }}>SKU: {item.ArtSku}</Typography>
                                                                            <Typography style={{ color: '#555', fontSize: '.85em', lineHeight: '1.8' }}>PRECIO POR CAJA</Typography>
                                                                            <Typography variant="h4" component="h2">${item.ArtPVenta}.00</Typography>
                                                                            <Typography style={{ color: '#555', fontSize: '.85em', lineHeight: '1.8' }}>Vendido por <Link to="/">{item.ArtMar}</Link></Typography>
                                                                            <Row style={{ width: '38%', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0 }}>
                                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItem()}>-</button></Col>
                                                                                <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '2.5' }}>{this.state.cantidad}</label></Col>
                                                                                <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.AgregarItem()}>+</button></Col>
                                                                            </Row>
                                                                            <Typography style={{
                                                                                background: '#90ee90',
                                                                                color: '#24905e',
                                                                                fontWeight: 700,
                                                                                bottom: '12rem',
                                                                                padding: '4px',
                                                                                borderRadius: '6px',
                                                                                width: '10%'
                                                                            }}>Cajas</Typography>
                                                                            <Row style={{ justifyContent: 'center' }}>
                                                                                <Button style={{ width: '40%', height: 60 }} variant="outlined" color="primary" onClick={() => this.AgregarCarrito(item.ArtSku, item.ArtDesTv, item.ArtPVenta)}>
                                                                                    Agregar
                                                        </Button>
                                                                            </Row>
                                                                        </Card>
                                                                        : null
                                                                ))}
                                                            </Col>
                                                            <Col sm={1}>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ backgroundColor: '#f7f7f7', padding: '20px 40px' }}>
                                                            <Typography style={{ borderBottom: '4px solid blue' }}>Descripción</Typography>
                                                        </Row>
                                                        <Row style={{ padding: 30 }}>
                                                            <Carousel itemsToScroll={8} itemsToShow={3}>
                                                                {this.state.productossugeridos.map((item) => (
                                                                    <Card style={{ padding: 15 }}>
                                                                        <Typography>{item.ArtDesTv}</Typography>
                                                                        <CardActionArea>
                                                                            <CardMedia style={{
                                                                                height: 115,
                                                                                backgroundSize: 'contain',
                                                                                backgroundPositionX: 'center',
                                                                                backgroundRepeat: 'no-repeat'
                                                                            }} image={url_general + "Content/Assets/Images/" + item.ArtSku + ".png"}></CardMedia>
                                                                        </CardActionArea>
                                                                        <Typography style={{ color: '#ffaf02' }}>SKU: {item.ArtSku}</Typography>
                                                                        <Typography variant="h6">${item.ArtPVenta}.00</Typography>
                                                                        <Link to={"/detallesugeridos/" + item.ArtSku}>
                                                                            <Button variant="outlined" color="primary">
                                                                                Agregar
                                                                            </Button>
                                                                        </Link>
                                                                    </Card>


                                                                ))}
                                                            </Carousel>


                                                        </Row>
                                                        <div style={{textAlign:'center', marginBottom:15}}>
                                                            <Link onClick={() => {window.location.href="/productosall"}}>Ver más</Link>
                                                        </div>
                                                        <Footer></Footer>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Row style={{ padding: 15, justifyContent: 'center', borderBottom: '1px solid #dedede' }}>
                                                            <Typography>Mi Carrito</Typography>
                                                        </Row>
                                                        {this.state.mostrar == true ?
                                                            <>
                                                                <Row style={{ overflowY: 'scroll', height: 360 }}>
                                                                    <div style={{ width: '100%', overflowY: 'scroll', height: 360 }}>
                                                                        {this.state.productosencarrito.map((produ) => (
                                                                            <Card style={{ width: '100%', padding: 15, borderBottom: '1px solid #dedede', borderRadius: 0, boxShadow: 'none' }}>
                                                                                <Row>
                                                                                    <Col sm={2}>
                                                                                        <CardMedia style={{ height: 88, width: 46 }} image={produ.Url}></CardMedia>
                                                                                    </Col>
                                                                                    <Col sm={7}>
                                                                                        <Media queries={{ small: { maxWidth: 1300 } }}>
                                                                                            {matches =>
                                                                                                matches.small ? (
                                                                                                    <Typography style={{ fontSize: '0.9rem' }}>{produ.Des}</Typography>
                                                                                                )
                                                                                                    :
                                                                                                    (
                                                                                                        <Typography>{produ.Des}</Typography>
                                                                                                    )
                                                                                            }
                                                                                        </Media>
                                                                                        <Row style={{ width: '100%', border: '1px solid #cacaca', borderRadius: '4px', marginBottom: 10, marginLeft: 0 }}>
                                                                                            <Col style={{ textAlign: 'center' }} sm={4}><button class="btnagregarnum" onClick={() => this.QuitarItemCarrito(produ.Sku)}>-</button></Col>
                                                                                            <Col style={{ textAlign: 'center' }} sm={4}><label style={{ lineHeight: '2.5' }}>{produ.Cantidad}</label></Col>
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
                                                                    </div>
                                                                </Row>

                                                                <Row style={{ justifyContent: 'center' }}>
                                                                    <Button style={{ backgroundColor: '#10266b', width: '85%', height: '40px', position: 'absolute', bottom: 10 }} variant="contained" disableElevation>
                                                                        <Link style={{ color: '#ffffff' }} to={'/formulariocompra'}>
                                                                            Finalizar Compra
                                                </Link>
                                                                    </Button>
                                                                </Row>
                                                            </>
                                                            : <p>No tienes productos en tu carrito.</p>
                                                        }
                                                    </Col>

                                                </Row>
                                            )
                                    )
                            }
                        </Media>
                    </div>

                    {/* <Route path="/detalleproducto/:id" exact={true} component={DetalleProducto}></Route> */}

                    {
                        this.state.mostrar_dialogo == true ?
                            <Dialog
                                open={this.state.open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={() => this.handleClose()}
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
            </HashRouter>
        );
    };

    componentDidMount() {
        console.log(window.innerHeight);
        if (localStorage.getItem("productosencarrito") != null) {

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
        this.CargarDetalleProducto().then(item => {
            this.setState({
                productodetalle: item[0]
            }, () => {
                this.CargarProductosSugeridos().then(result => {
                    this.setState({
                        productossugeridos: result[0]
                    }, () => { console.log("baby", this.state.productossugeridos) })
                })
            })
        });
        this.resize();
    }



    AgregarCarritoResponsive(sku, descripcion, precio) {
        this.AgregarCarrito(sku, descripcion, precio);
        this.setState({
            mostrarresponsive: true
        })

    }
    Refrescar() {
        this.setState({ redirigir: true })
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

    handleClickOpen() {
        this.setState({
            open: true,
            mostrar_dialogo: true
        })
    }

    handleClose() {
        this.setState({
            open: false,
            mostrar_dialogo: false
        })
    }

    AgregarItem() {
        var pz = this.state.cantidad;
        var total = pz + 1;
        if (total > 10) {
            this.handleClickOpen();

        } else {
            this.setState({
                cantidad: total
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
                    item.BanderaIngreso = true;

                    return item;
                }
            }

            return item;
        });
        this.setState(productos);
        localStorage.setItem("productosencarrito", JSON.stringify(productos))
    }

    QuitarItem() {
        var pz = this.state.cantidad;
        var total = pz - 1;
        if (total < 1) {
            total = 1;
        }
        this.setState({
            cantidad: total
        })
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
                    console.log("entro", punit)
                }
                return item;
            }

            return item;
        });
        this.setState(productos);
        localStorage.setItem("productosencarrito", JSON.stringify(productos))
    }

    AgregarCarrito(sku, descripcion, precio) {
        var array = this.state.productosencarrito;
        console.log('222', array);
        var index = array.findIndex(x => x.Sku === sku);
        var url = url_general + "Content/Assets/Images/" + sku + ".png";
        if (index !== -1) {
            let items = [...this.state.productosencarrito];
            let item = { ...items[index] };
            item.Cantidad = (item.Cantidad + this.state.cantidad);
            if (item.Cantidad > 10) {
                this.handleClickOpen();
            } else {
                item.BanderaIngreso = true;
                item.Precio = (item.Cantidad * precio)
                items[index] = item;
                this.setState({
                    productosencarrito: items
                }, () => {
                    localStorage.removeItem("productosencarrito");
                    localStorage.setItem("productosencarrito", JSON.stringify(this.state.productosencarrito))
                })
            }
        } else {
            var precio = (this.state.cantidad * precio);
            const producto = [{ "Sku": sku, "Url": url, "Des": descripcion, "Cantidad": this.state.cantidad, "Precio": precio, "BD": 0, "carga": false, "BanderaIngreso": true }];
            this.setState({
                productosencarrito: this.state.productosencarrito.concat(producto),
                mostrar: true
            }, () => {
                localStorage.removeItem("productosencarrito");
                localStorage.setItem("productosencarrito", JSON.stringify(this.state.productosencarrito))
            });
        }

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

    CargarDetalleProducto() {
        var pro = [];
        const posturl = url_general + "api/Articulo/" + this.state.id;
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

    resize() {
        const height = window.innerWidth;
        if (height > 800) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "scroll";
        }
    }
}


