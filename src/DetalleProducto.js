import React from 'react';
import {render} from 'react-dom';
import {HeadTop} from './componentes/HeadTop';
import {HeadBanner} from './componentes/HeadBanner';
import {Banner} from './componentes/Banner';
import {Productos} from './componentes/Productos';
import { Footer } from './componentes/Footer';
import { BrowserRouter, Route, Link,Redirect } from "react-router-dom";
import Carousel,{ consts } from 'react-elastic-carousel';
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
            mostrarresponsive: false
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
        <div class="body-content">
        <div className="cabecera">
        <div className="container-breadcrumbs sidebar-padding show-for-medium cell">
                <div className="breadcrumb breadcrumbs-outer"><div class="breadcrumb-refinement breadcrumb-controls" data-divider="y">
                <ul>
                <li className="flecha">
                    <Link to={'/'}>
                <a href="#" class="breadcrumb-home-element" data-cat-name="home">Inicio</a>
                </Link>
                </li>
                <li>
                <span className="svg-wrapper">
                <svg className="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                </span>
                
                <span className="segundo">Detalle del Producto</span>
                </li>
                
                </ul>
                </div></div>
            </div>
        </div>
             {/* <div class="single">
              
             </div> */}
               <div class="">
                    
                    <div class="cont span_2_of_3">
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
                                        <p>{this.state.cantidad}</p>
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
                    <div class="cont span_1_of_left">
                        <section  class="sky-form">
                          <h4>Mi Carrito</h4>
                        </section>
                        <section className="contenido-carrito">
                           {this.state.mostrar==true?
                         this.state.productosencarrito.map((produ)=>(
                            <>
                            {/* <div className="articulo">
                                <p className="pro-titulo">{produ.Des}</p>
                                <img className="miniimagen" src={produ.Url}/>
                                <a href="#"><img className="basurero" src={require('./images/Jumex/basura.png')} onClick={()=>this.EliminarCarrito(produ.Sku)}></img></a>
                                <div class="procantidadcarrito">
                                    <button class="btnagregarnum" onClick={()=>this.QuitarItem()}>-</button>
                                    <input className="inputcantidad" value={produ.Cantidad}/>
                                    <button class="btnagregarnum" onClick={()=>this.AgregarItem()}>+</button>
                                   
                                </div>

                            </div> */}
                             <ul class="panel-direccion-detalle">

<li class="li-direccion-resumen">
    <div class="direccion-primer-resumen">{produ.Des}</div>
    <div class="direccion-segundo-resumen">
        <span class="direccion-mun-col">SKU: {produ.Sku}</span>
    </div>

    <div class="direccion-tercero-detalle">
    <div class="seccion-articulo-bajo-detalle">
                <ul class="seccion-art-width">
                    {/* <li class="li-articulo"><a class="parte-title-bajo" href="#">Mas productos de Jumex</a></li> */}
                    
                    <li class="li-articulo"><a class="parte-title-bajo" onClick={()=>this.EliminarCarrito(produ.Sku)} href="#">Eliminar</a></li>
                </ul>
            </div>
    </div>

    <div class="imagen-resumen"><img  width={48} src={produ.Url}></img></div>
    <div class="cantidad-resumen-detalle">
    <div class="procantidadcarrito">
                                    <button class="btnagregarnum" onClick={()=>this.QuitarItemCarrito(produ.Sku)}>-</button>
                                    <input className="inputcantidad" value={produ.Cantidad+"Caja"}/>
                                    <button class="btnagregarnum" onClick={()=>this.AgregarItemCarrito(produ.Sku)}>+</button>
                                   
                                </div>
    </div>
    <div class="precio-resumen-detalle"><h1 class="h-precio-resumen-detalle">${produ.Precio}.00</h1></div>
</li>  

</ul>
                            </>
                        )):<p class="nohay">No tienes productos en tu carrito.</p>   
                        }
                        </section>
                        <section className="pagar-carrito">
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
}


