import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Footer } from './componentes/Footer';

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class ContenidoCarrito extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cantidadtitulo:0,
            productosencarrito:[],
            mostrar:false,
            token:'',
            mensaje:[],
            redirect:false,
            total:''
        }
    }
    render(){
        return(
            <Route>
            <div className='carrito-panel'>
                    <Card>
                        <CardContent>
                            {this.state.mostrar==false?
                           <>
                            <div class="titulo-carrito"><h1 class="label-carrito">Carrito ({this.state.cantidadtitulo})</h1></div>
                                  
                                        {this.state.productosencarrito.map((item)=>(
                                        <article class="articulo-carrito">
                                           
                                            <figure class="img-responsive">
                                                <img className="studio" width={48} height={80} src={item.Url}></img>
                                            </figure>
                                            <div>
                                                <div>
                                                    <h2>
                                                        <a class="descarrito-articulo" href="#">{item.Des}</a>
                                                    </h2>
                                                </div>
                                                <p class="sku-articulo">SKU:<span class="sku-articulosub">{item.Sku}</span></p>
                                                <div class="procantidadcarrito-articulo">
                                                        <button class="btnagregarnum" onClick={()=>this.QuitarItem(item.Sku)}>-</button>
                                                        <input className="inputcantidad" value={item.Cantidad}/>
                                                        <button class="btnagregarnum" onClick={()=>this.AgregarItem(item.Sku)}>+</button>
                                                    
                                                 </div>
                                                <span class="unidad-articulo">${item.Precio}.00</span>
                                                <span class="unidad-articulosub">Cajas</span>
                                              
                                            </div>
                                            <div class="seccion-articulo-bajo">
                                                <ul>
                                                <Link to={'/'}>
                                                    <li class="li-articulo">
                                                        
                                                        <a class="parte-title-bajo" href="#">Mas productos de Jumex</a>
                                                        </li>
                                                        </Link>

                                                    <li class="li-articulo"><a class="parte-title-bajo" href="#">Detalle</a></li>
                                                    <li class="li-articulo"><a class="parte-title-bajo" href="#">Mis Favoritos</a></li>
                                                    <li class="li-articulo"><a onClick={()=>this.EliminarArticulo(item.Sku)} class="parte-title-bajo" href="#">Eliminar</a></li>

                                                </ul>
                                            </div>
                                            <div class="seccion-articulo-bajo-responsive">
                                                <ul>
                                                    <li class="li-articulo"><Link to={'/'}><a class="parte-title-bajo" href="#">Mas productos de Jumex</a></Link></li>

                                                    <li class="li-articulo"><a onClick={()=>this.EliminarArticulo(item.Sku)} class="parte-title-bajo" href="#">Eliminar</a></li>

                                                </ul>
                                            </div>
                                        
                                            </article>
                                        
                                        ))} 
                                        <article class="total"><p class="total-letra">Total: ${this.state.total}.00</p></article>     
                                        <button class="btnregistro" onClick={()=>this.RegistrarArticulos()}>Continuar Compra</button>
        
                                         
                           </> :
                            <div class="titulo-carrito-sinpro">
                                <img width={100} src={require('./images/Jumex/triste.png')}></img>
                                <br></br>
                                <p>No tienes productos en tu carrito.</p>
                                <br></br>
                                Ve todos nuestros productos <Link to={'/'}>Aquí</Link>
                            </div>
                           }

                                   
                        </CardContent>
                    </Card>    
                    <Footer></Footer>
                  </div>  

                  {this.state.redirect==true?
                    <Redirect push to={'/direcciones'}></Redirect>
                    :null
                    }
                  </Route>
        )
    }

    componentDidMount(){
        if(localStorage.getItem("token")!=null){
            this.setState({token:localStorage.getItem("token")})
            if(localStorage.getItem("productosencarrito")!=null){
         
                        var e=localStorage.getItem("productosencarrito");

                        console.log("pddd",JSON.parse(e));
                        this.setState({
                            productosencarrito:JSON.parse(e),
                        },()=>{
                            var total=0;
                            for(var i=0; i < this.state.productosencarrito.length; i++){
                                total =(total+this.state.productosencarrito[i].Precio)
                            }
                            console.log("mi precio",total);
                            this.setState({ 
                                cantidadtitulo:this.state.productosencarrito.length,
                                total:total
                            })
                        })
            }
        }
    }

    AgregarItem(sku){
        const { productos: productosencarrito } = this.state;
      const productos= this.state.productosencarrito.map(item=>{
          
            if(item.Sku===sku){
                if(item.Cantidad===1){
                    item.Cantidad += 1;
                    item.Precio=(item.Cantidad*item.Precio)

                }
                else{
                    var punit=(item.Precio/item.Cantidad);
                    item.Cantidad += 1;
                    item.Precio=(item.Cantidad*punit)
                    console.log("entro",punit)
                }
              
               return item;
            }

            return item;
        });
        this.setState(productos);
        var total=0;
        for(var i=0; i < this.state.productosencarrito.length; i++){
            total =(total+this.state.productosencarrito[i].Precio)
        }
        console.log("mi precio",total);
        this.setState({ 
            cantidadtitulo:this.state.productosencarrito.length,
            total:total
        })
        localStorage.setItem("productosencarrito",JSON.stringify(productos))
    }
    QuitarItem(sku){
        const { productos: productosencarrito } = this.state;

      const productos= this.state.productosencarrito.map(item=>{
            if(item.Sku===sku){
                if(item.Cantidad===1){
                    item.Cantidad -= 1;
                    item.Precio=(item.Cantidad*item.Precio)
                }
                else{
                    var punit=(item.Precio/item.Cantidad);
                    item.Cantidad -= 1;
                    item.Precio=(item.Cantidad*punit)
                    console.log("entro",punit)
                }
               return item;
            }

            return item;
        });
        this.setState(productos);
        var total=0;
        for(var i=0; i < this.state.productosencarrito.length; i++){
            total =(total+this.state.productosencarrito[i].Precio)
        }
        console.log("mi precio",total);
        this.setState({ 
            cantidadtitulo:this.state.productosencarrito.length,
            total:total
        })
        localStorage.setItem("productosencarrito",JSON.stringify(productos))

    }
    EliminarArticulo(sku){
        var array=this.state.productosencarrito;
        var index=array.findIndex(x=>x.Sku === sku);
        if(index !== -1){
            var total= (this.state.total- array[index].Precio);
            
            array.splice(index,1);
            this.setState({
                productosencarrito:array,
                total:total
            },()=>{
               if(this.state.productosencarrito.length == 0){
                   this.setState({
                       mostrar:true
                   });
                   localStorage.removeItem("productosencarrito");
               }
               else{
                  localStorage.removeItem("productosencarrito");
                  localStorage.setItem("productosencarrito",JSON.stringify(this.state.productosencarrito))  
               }        
              })
        }
    }
    RegistrarArticulos(){
        this.InsertarProductos(this.state.token).then(item=>{
            this.setState({
                mensaje:item
            },()=>{
                if(this.state.mensaje.Estatus=="OK" || this.state.mensaje.Mensaje=="Existe una compra pendiente, no pudes iniciar otra"){
                     this.setState({
                        redirect:true
                     })   
                }
            })
        });

        
    }
    InsertarProductos(token){
        var data=[];
        this.state.productosencarrito.map(item=>{
            data.push({
                'ArtSku':item.Sku,
                'ArtCant':item.Cantidad,
                'ArtUnidad':'Caja'
            })

        });
        console.log("si se pdo",data);
    
        const posturl=url_general+"api/Carrito/agregar";
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }).then(
                (res)=>res.json()
            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
              
                resolve(resp);
            });
           
        });
        return result;
    }
    
}