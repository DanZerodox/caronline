import React from 'react';
import {render} from 'react-dom';
import {HeadTop} from './componentes/HeadTop';
import {HeadBanner} from './componentes/HeadBanner';
import {Banner} from './componentes/Banner';
import {Productos} from './componentes/Productos';
import { Footer } from './componentes/Footer';
import { BrowserRouter, Route, Link,Redirect } from "react-router-dom";
import Carousel,{ consts } from 'react-elastic-carousel';
import { BarraInicio } from './componentes/BarraInicio';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CardHeader } from '@material-ui/core';
// import { threadId } from 'worker_threads';
//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class DetalleProducto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:props.match.params.id,
            productodetalle:[],
            cantidad:1,
            productosencarrito:[],
            mostrar:false,
            productossugeridos:[],
            mostrarresponsive: false,
            height: 0,
            width: 0,
            marginLeft: 0
        }
    }
    myArrow({ type, onClick, isEdge }) {
        const pointer = type === consts.PREV ? '👈' : '👉'
        return (
          <button onClick={onClick} disabled={isEdge}>
            {pointer}
          </button>
        )
      }
    render(){
        console.log(this.state.id);
        return (
            <Route>
        <> 
        <div class="bodi-sus" style={{overflowY:'hidden', height:this.state.height}}>
        <BarraInicio></BarraInicio>

             {/* <div class="single">
              
             </div> */}
               <div class="">
                    
                    <div class="cont span_2_of_3" style={{height:this.state.height, overflowX:'hidden'}}>
                        <div class="labout span_1_of_a1">
                            <ul id="etalage">
                                <li>
                                    <a href="#">
                                        <img class="etalage_thumb_image" src={url_general+"Content/Assets/Images/"+this.state.id+".png"} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="cont1 span_2_of_a1">
                            {this.state.productodetalle.map((item)=>(
                                item.ArtSku==this.state.id?
                               <>
                                <h3 class="m_3">{item.ArtDesTv}</h3>
                                <div class="price_single">							
                                <span class="actual">SKU: {item.ArtSku}</span>							 
							    </div>
                                 <h4 class="m_9">Precio por Caja</h4>
                                    <h4 class="precio">${item.ArtPVenta}.00</h4> 
                                    <h4 class="marca">Vendido por <Link to="/">{item.ArtMar}</Link></h4>
                                    <div class="cantidadcarrito">
                                        <button class="btnagregarnum" onClick={()=>this.QuitarItem()}>-</button>
                                        <p style={{marginTop:17}}>{this.state.cantidad}</p>
                                        <button class="btnagregarnum" onClick={()=>this.AgregarItem()}>+</button>
                                       
                                    </div>
                                    <span class="tipo">Cajas</span>
                                    <button class="btnagrecarrito" onClick={()=>this.AgregarCarrito(item.ArtSku,item.ArtDesTv,item.ArtPVenta)}>Agregar</button>
                                    <button class="btnagrecarritoresponsive" onClick={()=>this.AgregarCarritoResponsive(item.ArtSku,item.ArtDesTv,item.ArtPVenta)}>Agregar</button>
                                    {this.state.mostrarresponsive==true?
                                        <Redirect push to={'/carritoresponsive'}></Redirect>
                                        :null
                                    }
                               </>
                                :null
                                                                    
                            ))}
                         
                        </div>
                        <div class="labout span_1_of_a1">
                        {/* <div class="toogle">
     	<h3 class="m_3">Detalle del Producto</h3>
     	<p class="m_text">Esto se veria mas bonito si tuviera una descripción, pero no tiene asi que esto es una prureba nada mas</p>
     </div>	 */}
                        </div>
                        <div class="descripcionseccion">
                        <div class="descripcion">
                            <p class="dato1">Descripción</p>
                         
                        </div>
                    
                    </div> 
                    <div class="descipciontexto">
                            {this.state.productodetalle.map(item=>(
                               item.ArtSku==this.state.id?
                               <p>{item.ArtDes}</p>
                               :null
                            ))}
                    </div>  
                    <div class="sugerencias">
                    <Carousel itemsToScroll={8} itemsToShow={3}>
                    {this.state.productossugeridos.map(item=>
                    <div class="contorno">
                     <div class="">
                        <div class="clear"></div>	
                      </div>
                      <div class="">
                       <div class="">
                                <div class="">
                                <div class="view view-fifth">
                                <div class="top_box">
                                    <h3 class="m_1">{item.ArtDes}</h3>
                                    <p class="m_2">{item.ArtDesTv}</p>
                                    <div class="grid_img">
                                        <div class="css3"><img class="imagen1" src={url_general+"Content/Assets/Images/"+item.ArtSku+".png"} alt=""/></div>
                                     
                                    </div>
                                 
                                        <div class="price">SKU: {item.ArtSku}</div>
                                        <Link to={'/detalleproducto/'+item.ArtSku}>
                                        <button onClick={()=>this.Refrescar()} class="btnver">Ver</button>
                                        </Link>
                                </div>
                             </div>
                                </div>
                          
                       </div>
                      </div>
                    </div> 
                    )}
                    </Carousel>
                     
                   
                    </div>    
                    <Footer></Footer>  
                    </div>
                    <div class="cont span_1_of_left" style={{width:this.state.width}}>
                        <section  class="sky-form">
                          <h4>Mi Carrito</h4>
                        </section>
                        <div style={{padding:20, overflowY:'scroll', height:350} }>
                        {this.state.mostrar==true?
                        this.state.productosencarrito.map((produ)=>(

                            <Card style={{border:'1px solid #dedede', padding:10,  marginBottom:15}}>
                             <CardMedia image={produ.Url} style={{float:'left', width:60, height:100}}>

                             </CardMedia>   
                             <CardContent>
                             <div style={{
                                        marginLeft: 8,
                                        fontWeight: "bold",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        fontSize: 15,
                                        textOverflow: "ellipsis",
                                        padding:'0px 10px'
                                }}>{produ.Des}
                                </div>
                                <div style={{
                                      marginLeft: 8,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      fontSize: 15,
                                      textOverflow: "ellipsis",
                                      padding:'0 10px'
                                }}>
                                    Sku: {produ.Sku}
                                    <div style={{
                                        float:'right',
                                        fontSize:20,
                                        fontWeight:600
                                    }}>
                                        ${produ.Precio}.00
                                    </div>
                                </div>
                                <div style={{float:'left', width:125, padding:'0px 6px', border:'1px solid #cacaca', borderRadius:4, marginLeft:this.state.marginLeft}}>
                                    <button class="btnagregarnum" onClick={()=>this.QuitarItem()}>-</button>
                                    <input className="inputcantidad" value={produ.Cantidad}/>
                                    <button class="btnagregarnum" onClick={()=>this.AgregarItem()}>+</button>
                                   
                                </div>
                                <div style={{float:"right", marginTop:16}}>
                                <a class="parte-title-bajo" onClick={()=>this.EliminarCarrito(produ.Sku)} href="#">Eliminar</a>
                                </div>    
                             </CardContent>   
                            </Card>   
                        ))
                        :<p class="nohay">No tienes productos en tu carrito.</p>}
                        </div>
                        <section className="pagar-carrito" style={{textAlign:'center'}}>
                           {this.state.mostrar==true?
                         <Link to={'/formulariocompra'}>
                         <button className="btnpagar">Finalizar Compra</button>
                         </Link>
                        : null
                        }
                        </section>
                    </div>
                  
                </div>
                </div>
        </>

        </Route>
        );
    };

    componentDidMount(){

        if(localStorage.getItem("productosencarrito")!=null){
         
        var e=localStorage.getItem("productosencarrito");
        console.log("pddd",JSON.parse(e));
        this.setState({
            productosencarrito:JSON.parse(e)
        },()=>{

            if(this.state.productosencarrito!=null){
                this.setState({mostrar:true})
            }
        })
        }
        this.CargarDetalleProducto().then(item=>{
            this.setState({
                productodetalle:item[0]
            },()=>{
                  this.CargarProductosSugeridos().then(result=>{
                      this.setState({
                          productossugeridos:result[0]
                      },()=>{console.log("baby",this.state.productossugeridos)})
                  })  
            })
        });  
        this.resize();   
    }

    AgregarCarritoResponsive(sku,descripcion,precio){
        this.AgregarCarrito(sku,descripcion,precio);
        this.setState({
            mostrarresponsive:true
        })

    }
    Refrescar(){
        window.location.reload();
    }
    CargarProductosSugeridos(){
        var pro=[];
        const posturl=url_general+"api/Articulo/sugeridos";
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(
                (res)=>res.json()
            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
                pro.push(resp);
                resolve(pro);
            })
        });

        return result;
    }
    AgregarItem(){
     var pz=this.state.cantidad;
         var total= pz + 1;
         this.setState({
             cantidad:total
         })   
    }
    AgregarItemCarrito(sku){
     
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
          localStorage.setItem("productosencarrito",JSON.stringify(productos))
    }

    QuitarItem(){
    var pz=this.state.cantidad;
        var total= pz - 1;
        if(total < 0){
            total=0
        }
        this.setState({
            cantidad:total
        })   
    }
    QuitarItemCarrito(sku){
        
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
          localStorage.setItem("productosencarrito",JSON.stringify(productos))
    }

    AgregarCarrito(sku,descripcion,precio){
        var array=this.state.productosencarrito;
        var index=array.findIndex(x=>x.Sku === sku);
        var url=url_general+"Content/Assets/Images/"+sku+".png";
        if(index !== -1){
            let items=[...this.state.productosencarrito];
            let item={...items[index]};
            item.Cantidad=(item.Cantidad + this.state.cantidad);
            item.Precio=(item.Cantidad * precio)
            items[index]=item;
            this.setState({
                productosencarrito:items
            },()=>{
                localStorage.removeItem("productosencarrito");
                localStorage.setItem("productosencarrito",JSON.stringify(this.state.productosencarrito))
            })
        }else{
            var precio=(this.state.cantidad * precio);
            const producto=[{"Sku":sku,"Url":url,"Des":descripcion,"Cantidad":this.state.cantidad,"Precio":precio}];
            this.setState({
                productosencarrito:this.state.productosencarrito.concat(producto),
                mostrar:true
            },()=>{
                localStorage.removeItem("productosencarrito");
                localStorage.setItem("productosencarrito",JSON.stringify(this.state.productosencarrito))
            });
        }
       
    }

    EliminarCarrito(sku){
      var array=this.state.productosencarrito;
      var index=array.findIndex(x=>x.Sku === sku);
      if(index !== -1){
          array.splice(index,1);
          this.setState({
              productosencarrito:array
          },()=>{
             if(this.state.productosencarrito.length == 0){
                 this.setState({
                     mostrar:false
                 });
                 localStorage.clear();
                 localStorage.setItem("productosencarrito",JSON.stringify(this.state.productosencarrito))  
             }
             else{
                localStorage.clear();
                localStorage.setItem("productosencarrito",JSON.stringify(this.state.productosencarrito))  
             }        
            })
      }
    }

    CargarDetalleProducto(){
        var pro=[];
        const posturl=url_general+"api/Articulo/"+this.state.id;
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(
                (res)=>res.json()
            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
                pro.push(resp);
                resolve(pro);
            })
        });

        return result;
    }

    resize() {
        const height = window.innerWidth;
        if(height >1900){
            this.setState({height:1000, width:727})
        }
        else if(height < 1500){
            this.setState({height:550, width:485, marginLeft:85})
        }else{
            this.setState({height:750, width:582, marginLeft:148})
        }
       console.log(height);
    }
}


