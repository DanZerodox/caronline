import React from 'react';
import { Card, CardContent, Typography, Box, CardMedia } from '@material-ui/core';
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
                            <div>
                                <div style={{fontSize:34, fontWeight:600}}>Carrito ({this.state.cantidadtitulo})</div>
                                {this.state.productosencarrito.map((item)=>(
                                    <div style={{padding:'60px 200px'}}>
                                        <CardMedia style={{width:60, height:100, float:'left'}} image={item.Url}></CardMedia>
                                        <CardContent>
                                            <div style={{
                                            marginLeft: 8,
                                            fontWeight: "bold",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            fontSize: 15,
                                            textOverflow: "ellipsis",
                                            padding:'0px 10px'
                                            }}>{item.Des}
                                            </div>
                                            <div style={{
                                             marginLeft: 8,
                                             whiteSpace: "nowrap",
                                             overflow: "hidden",
                                             fontSize: 15,
                                             textOverflow: "ellipsis",
                                             padding:'0px 10px',
                                             color:'#00a650'
                                            }}>
                                            Sku: {item.Sku}
                                           
                                            <div style={{
                                            float:'right',
                                            fontSize:36,
                                            fontWeight:600,
                                            color:'black'    
                                             }}>
                                                  <div style={{float:'left', width:125, padding:'0px 6px', border:'1px solid #cacaca', borderRadius:4, marginLeft:this.state.marginLeft, marginRight:170}}>
                                                <button class="btnagregarnum" onClick={()=>this.QuitarItem()}>-</button>
                                                <input className="inputcantidad" value={item.Cantidad}/>
                                                <button class="btnagregarnum" onClick={()=>this.AgregarItem()}>+</button>
                                            
                                            </div>
                                            ${item.Precio}.00
                                           
                                            </div>
                                           
                                    </div>
                                    <div class="">
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
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                           :
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