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
            total: '',
            carritoDB:[],
            productosBD:[],
            mostrarvacio:false
        }
    }
    render() {
        return (
            <Route>
                {this.state.mostrarvacio==false?
                 <Media queries={{ small: { maxWidth: 480 }, medium: { maxWidth: 1300 }, large: { maxWidth: 1600 } }}>
                 {matches =>
                     matches.small ? (
                         <>
                         <div style={{ padding: 15, borderBottom: '1px solid #dedede' }}>
                             <Typography>
                             <Link to={'/'}>Inicio</Link>
                             <span className="svg-wrapper">
                                     <svg className="icono" style={{width:20}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                             </span> Mi Carrito ({this.state.cantidadtitulo})
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
                                         <Button style={{width:'10%'}} onClick={() => this.EliminarArticulo(produ.Sku)}>Eliminar</Button>
                                     </Col>
                                 </Row>
                             </Card>
                             ))}
                         </Row>
                        
                         <div style={{textAlign:'center'}}>
                         <Typography style={{ padding: 30, fontSize: '2rem' }}>Total: ${this.state.total}.00</Typography>
                             <Button style={{backgroundColor: '#10266b', width: '70%', height: 60}} variant="outlined" onClick={()=>this.RegistrarArticulos()}>
                                 <label style={{color:'#ffffff'}}>Pasar a Pago</label>                                        
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
                                                             <li><Button style={{width:'10%'}} onClick={() => this.EliminarArticulo(item.Sku)}>Eliminar</Button></li>

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
                                         <Button style={{ backgroundColor: '#10266b', height: 70, float: 'right', marginRight: 26 }} onClick={()=>this.RegistrarArticulos()} variant="contained" color="primary" disableElevation>Pasar a Pago</Button>
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
                                                                 <li><Button style={{width:'10%'}} onClick={() => this.EliminarArticulo(item.Sku)}>Eliminar</Button></li>

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
                                             <Button style={{ backgroundColor: '#10266b', height: 70, float: 'right', marginRight: 26 }} variant="contained" onClick={()=>this.RegistrarArticulos()} color="primary" disableElevation>Pasar a Pago</Button>
                                         </Card>
                                     </>
                                 )
                         )
                 }
             </Media>

                :
                <>
                 <div style={{ padding: 15, borderBottom: '1px solid #dedede' }}>
                            <Typography>
                            <Link to={'/'}>Inicio</Link>
                            <span className="svg-wrapper">
                                    <svg className="icono" style={{width:20}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                            </span> Mi Carrito
                            </Typography>
                </div>
                <div style={{padding:"177px 24px"}}>
                 <label style={{marginBottom:20}}> No cuentas con ningun articulo en tu carrito.</label>
                    <Button style={{backgroundColor:'#10266b', width:'100%', height:'40px'}} variant="contained" disableElevation>
                            <Link style={{color:'#ffffff'}} to={'/'}>
                                 Ver Productos
                             </Link>    
                    </Button>
                </div>
                </>
                }
               
               {this.state.redirect==true?
                    <Redirect push to={'/direcciones'}></Redirect>
                    :null
                }
             
              
                <Footer></Footer>
            </Route>
        )
    }

    componentDidMount() {
        console.log(window.innerHeight);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("carritoDB"));
        this.resize();
        if (localStorage.getItem("token") != null) {
           
            this.setState({ token: localStorage.getItem("token") })
            if (localStorage.getItem("productosencarrito") != null) {

                var e = localStorage.getItem("productosencarrito");
                
                console.log("pddd", JSON.parse(e));
                this.setState({
                    productosencarrito: JSON.parse(e),
                }, () => {
                    console.log('primera parte',this.state.productosencarrito);
                    this.ConsultarCarrito(localStorage.getItem("token")).then(item=>{
                        console.log("luna",item);
                        this.setState({
                            carritoDB:item
                        },()=>{
                            console.log("CARRITO",item[0]);
                            var oye=item[0];
                            if(typeof item[0] =="undefined"){
                                this.UnirCarritos(1)
                            }else{
                                this.UnirCarritos(0)
                            }

                        })
                    });
                   
                })
            }
            else{
                this.ConsultarCarrito(localStorage.getItem("token")).then(item=>{
                    console.log("AQUI ESTA",item);
                    if(typeof item[0] ==  "undefined"){
                       this.setState({mostrarvacio:true})
                    }else{
                    console.log(item);
                    const datos=[];
                    this.setState({productosBD:item},()=>{
                        this.state.productosBD.map(a=>{
                            a.Articulos.map(item2=>{
                            
                                    var item={"Sku":item2.ArtSku, "Url": url_general+'/Content/Assets/Images/'+item2.ArtSku+'.png',"Des":item2.ArtDesTv, "Cantidad":item2.TickDetCant, "Precio":Number(item2.TickDetSubTotal), "BD":item2.TickDetCant,"carga":true}
                                    datos.push(item);
                            })
                        })
                    });

                    this.setState({productosencarrito:datos})
                    }  
                })
            }

        }

       
    }
    UnirCarritos(numero){
        console.log("AQUIUNO",this.state.carritoDB);
        console.log("AQUI",this.state.productosencarrito);
        const datos=[];
        if(numero == 0){
            // for(var i=0; i < this.state.productosencarrito.length; i++){
            //     datos.push(this.state.productosencarrito[i]);
            // }
            console.log("global",datos);
            this.state.carritoDB.map(item=>{
                item.Articulos.map(item2=>{
                   var existe = this.state.productosencarrito.findIndex(x=> x.Sku == item2.ArtSku);
                  
                   if(existe!==-1){
                    let items=[...this.state.productosencarrito];
                    let item={...items[existe]};
                    var rest=0;
                    if(item.BD==0){
                        item.carga=false;
                        rest=0
                    }
                    else{
                        item.carga=true;
                        rest=item2.TickDetSubTotal
                    }
                    item.Cantidad=(item.Cantidad + Number(item2.TickDetCant)-item.BD);
                    item.Precio=(item.Precio + Number(item2.TickDetSubTotal)-rest);
                    item.BD=Number(item2.TickDetCant);
                    items[existe]=item;
                    datos.push(item);
                    console.log("mis data",datos);
                   }else{
                       var item={"Sku":item2.ArtSku, "Url": url_general+'/Content/Assets/Images/'+item2.ArtSku+'.png',"Des":item2.ArtDesTv, "Cantidad":item2.TickDetCant, "Precio":Number(item2.TickDetSubTotal), "BD":0,"carga":false}
                       datos.push(item);    
                   }
                   
                })
               
           });

            this.state.productosencarrito.map(ite=>{
                console.log("aqui llevo esto", this.state.productosencarrito);
                var existe = datos.findIndex(x=> x.Sku == ite.Sku);
                if(existe !== -1){
                    console.log("nada");
                }else{
                    var item={"Sku":ite.Sku, "Url": ite.Url,"Des":ite.Des, "Cantidad":ite.Cantidad, "Precio":ite.Precio, "BD":ite.BD,"carga":ite.carga}
                    datos.push(item); 
                }
             })

           this.setState({
            productosencarrito:datos
        },()=>{
            console.log("SALIO",this.state.productosencarrito);
         var total = 0;
         for (var i = 0; i < this.state.productosencarrito.length; i++) {
             total = (total + this.state.productosencarrito[i].Precio)
         }
        
         console.log("mi precio", total);
         this.setState({
             cantidadtitulo: this.state.productosencarrito.length,
             total: total
         });
        //  localStorage.removeItem(); 
        })
        }else{
            this.setState({
                productosencarrito:this.state.productosencarrito
            },()=>{
                var total = 0;
         for (var i = 0; i < this.state.productosencarrito.length; i++) {
             total = (total + this.state.productosencarrito[i].Precio)
         }
         console.log("mi precio", total);
         this.setState({
             cantidadtitulo: this.state.productosencarrito.length,
             total: total
         });
            })
        }
      
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

    AgregarItem(sku) {
        const { productos: productosencarrito } = this.state;
        const productos = this.state.productosencarrito.map(item => {

            if (item.Sku === sku && item.carga===false) {
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
            else if(item.Sku === sku && item.carga===true){
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
                    if(item.Cantidad < 1){
                        this.EliminarArticulo(item.Sku);
                    }
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
            var cantidadc = this.state.cantidadtitulo - 1;

            this.setState({
                productosencarrito: array,
                total: total,
                cantidadtitulo:cantidadc
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
                localStorage.removeItem("productosencarrito");
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
                .catch(error => console.log('Error Contenido Carrito', error))
                .then(resp => {

                    resolve(resp);
                });

        });
        return result;
    }

    
    resize() {
        const height = window.innerWidth;
        if(height>800){
            document.body.style.overflow="scroll";
        }
        else{
            document.body.style.overflow="scroll";
        }
    }

}