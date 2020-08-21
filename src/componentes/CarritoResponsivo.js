import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Carousel,{ consts } from 'react-elastic-carousel';
import { Footer } from './Footer';


export class CarritoResponsivo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            productosencarrito:[],
            productossugeridos:[]
        }
    }
    render(){
        return(
           <Route>
               <div class="seccion-responsive">
                        <section  class="sky-form">
                          <h4>Mi Carrito</h4>
                        </section>
                        <section className="contenido-carrito">
                           {this.state.mostrar==true?
                         this.state.productosencarrito.map((produ)=>(
                            <>
                        
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
                                <div class="procantidadcarritoresponsive">
                                                                <button class="btnagregarnumresponsive" onClick={()=>this.QuitarItemCarrito(produ.Sku)}>-</button>
                                                                <input className="inputcantidad" value={produ.Cantidad+"Caja"}/>
                                                                <button class="btnagregarnumresponsive" onClick={()=>this.AgregarItemCarrito(produ.Sku)}>+</button>
                                                            
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
                        <>
                        <Link to={'/'}>
                        <button class="btnagrecarritoresponsivev2">Continuar Comprando</button>
                        </Link>
                         <Link to={'/formulariocompra'}>
                         <button className="btnpagar">Finalizar Compra</button>
                         </Link>
                        </>
                        : null
                        }
                        </section>
                        <div class="sugerencias">
                            <h2 class="titulo-responsivo">Puede interesarte</h2>
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
                                        <div class="css3"><img class="imagen1" src={"https://192.168.224.168:44387/qa_tiendajumex/Content/Assets/Images/"+item.ArtSku+".png"} alt=""/></div>
                                     
                                    </div>
                                 
                                        <div class="price">SKU: {item.ArtSku}</div>
                                        <button class="btnver">Ver</button>
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

           </Route>
        )
    }
    componentDidMount(){
        if(localStorage.getItem("productosencarrito")!=null){
         
            this.CargarProductosSugeridos().then(result=>{
                this.setState({
                    productossugeridos:result[0]
                },()=>{console.log("baby",this.state.productossugeridos)})
            })  
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
    }

    CargarProductosSugeridos(){
        var pro=[];
        const posturl="https://192.168.224.168:44387/qa_tiendajumex/api/Articulo/sugeridos";
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
}