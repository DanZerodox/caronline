import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import {Footer} from './componentes/Footer';
//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class ResumenCompra extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arreglo:[],
            direccion:[],
            mostrar: false,
            tipo_entrega:0
        }
    }
    render(){
        return(
            <Route>
                 {this.state.mostrar==false?
                    <>
                                  <div className='direcciones-panel'>
                  <Card>
                      <CardContent>
                        <h2 class="direccion-title">Resumen de tu pedido</h2>
                        <div class="morty-resumen">
                        {this.state.arreglo.map(item=>(
                            item.Articulos.map(item2=>(
                               <>
                                <ul class="panel-direccion" style={{height:166}}>

                                <li class="li-direccion-resumen">
                                    <div class="direccion-primer-resumen">{item2.ArtDesTv}</div>
                                    <div class="direccion-segundo-resumen">
                                        <span class="direccion-mun-col">SKU: {item2.ArtSku}</span>
                                    </div>
                                    <div class="direccion-tercero-resumen">
                                    <div class="seccion-articulo-bajo-resumen">
                                                <ul class="lista-bajo-resumen">
                                                    <li class="li-articulo-resumen"><a class="parte-title-bajo" href="#">Mas productos de Jumex</a></li>
                                                    <li class="li-articulo-resumen"><a class="parte-title-bajo" href="#">Detalle</a></li>
                                                    {/* <li class="li-articulo"><a class="parte-title-bajo" href="#">Mis Favoritos</a></li> */}
                                                </ul>
                                            </div>
                                    </div>
        
                                    <div class="imagen-resumen"><img  width={48} src={url_general+"Content/Assets/Images/"+item2.ArtSku+".png"}></img></div>
                                    <div class="cantidad-resumen"><h2>Cantidad: {item2.TickDetCant} cajas</h2></div>
                                    <br></br>
                                    <div class="precio-resumen"><h1 class="h-precio-resumen">${item2.TickDetSubTotal}.00</h1></div>
                                </li>  
                                
                                </ul>
                                </>
                            ))
                        ))}
                          
                       </div>
                       <div class="editar-direccion">
                            {this.state.tipo_entrega==0?
                             this.state.direccion.map(dir=>(
                                <ul class="panel-direccion">
                                <li class="li-direccion-final-resumen">
                                 <div class="direccion-primer">Dirección de entrega</div>
                                    <div class="direccion-segundo">
                                     <span class="direccion-mun-col">{dir.Direccion+" - "+dir.Municipio+", "+dir.Estado}</span>
                                    </div>
                                    <div class="direccion-segundo">
                                     <span class="direccion-mun-col">{dir.Colonia+", C.P. "+dir.CP+" - "+dir.Referencia}</span>
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
                          <button class="btnfin-resumen" onClick={()=>this.FinalizarPedido()}>Finalizar</button>
                      </CardContent>
                  </Card>
                  {/* <Footer></Footer>               */}
              </div>
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
            </Route>
        )
    }

    componentDidMount(){
        var token=localStorage.getItem("token");
        var direccion_id=localStorage.getItem("direccion_id");
        var tipo_entrega=localStorage.getItem("tipo_entrega");
        this.setState({tipo_entrega:tipo_entrega});
            this.ConsultarCarrito(token).then(item=>{
                this.setState({
                    arreglo:item
                },()=>{
                  if(tipo_entrega==0){
                    // this.ConsultarDireccion(token,direccion_id).then(result=>{
                    //     this.setState({
                    //         direccion:result
                    //     },()=>{console.log(this.state.direccion)})
                    // })
                    var e=localStorage.getItem("direccion_objeto");
                    this.setState({
                        direccion:JSON.parse(e)
                    })    

                  }
                })
            })
        
    
    }

    FinalizarPedido(){
        this.CerrarPedido(localStorage.getItem("token"),localStorage.getItem("direccion_id"));
        this.setState({
            mostrar:true
        });
        localStorage.removeItem("productosencarrito");
        localStorage.setItem("compras",JSON.stringify(this.state.arreglo));
        localStorage.setItem("direccion",this.state.direccion);
    }

    CerrarPedido(token,direccion_id){
        console.log(token);
        var posturl="";
        if(localStorage.getItem("tipo_entrega")==0){
            posturl=url_general+"api/Carrito/confirmar/0/"+direccion_id;
        }
        else{
            posturl=url_general+"api/Carrito/confirmar/1";
        }
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'POST',
                headers:{ 
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }).then(
                (res)=>res.json()

            )
            .catch(error=>console.log('Error',error));
        });

        return result;    
    }

    ConsultarDireccion(token,direccion_id){
        console.log(token);
        var pro=[];
        const posturl=url_general+"api/Usuario/direccion/"+direccion_id;
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'POST',
                headers:{ 
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }).then(
                (res)=>res.json()

            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
                pro.push(resp);
                resolve(resp);
            });
        });

        return result;      
    }

    ConsultarCarrito(token){
        var pro=[];
        const posturl=url_general+"api/Carrito/consultar";
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'GET',
                headers:{ 
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token
                }
            }).then(
                (res)=>res.json()

            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
                pro.push(resp);
                resolve(pro);
            });
        });

        return result;    
    }
}