import { Component } from "react";
import React from 'react';
import { Table, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Footer } from '../componentes/Footer';
import {Banner} from '../componentes/Banner';

// import 'bootstrap/dist/css/bootstrap.min.css';

export class Productos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            productos: []
        }
    }
 
   render(){
        return(
            <Route>
                
            <>
            <div class="bodi-sus">
            <div className="productoprincipal">
            <div className="cabecera">
            <div className="container-breadcrumbs sidebar-padding show-for-medium cell">
                <div className="breadcrumb breadcrumbs-outer"><div class="breadcrumb-refinement breadcrumb-controls" data-divider="y">
                <ul>
                <li className="flecha">
                <a href="https://store.ubi.com/ofertas/home?lang=es_MX" class="breadcrumb-home-element" data-cat-name="home">Inicio</a>
                </li>
                <li>
                <span className="svg-wrapper">
                <svg className="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M252.684 2.67l-35.33 35.331 186.999 187H0v49.97h404.353l-187 187.098 35.331 35.331 211.985-212.083L500 249.987l-35.33-35.331z" fill="#008aa4"></path></svg>
                </span>
                
                <span className="segundo">Últimos Productos</span>
                </li>
                
                </ul>
                </div></div>
            </div>
            </div>
            <Banner></Banner>
            <div class="cell large-3 hide-for-xlarge paging-information">
                    <div class="clp-all-title">
                    <span>Todo</span>
                    </div>
                    </div>
            <div class="division">
                <div class="filtros"></div>
            </div>	
            <div class="main">
          
                <div class="wrap">
                      <div class="content-top">
                        <div class="clear"></div>	
                      </div>
                      <div class="content-bottom">
                       <div class="box1">
                        {this.state.productos.map((item)=>(
                            
                             <div class="col_1_of_3 span_1_of_3"><a href="#">
                             <div class="view view-fifth">
                                <div class="top_box">
                                    <h3 class="m_1">{item.ArtDes}</h3>
                                    
                                    <div class="grid_img">
                                        <div class="css3"><img class="imagen1" src={"https://192.168.224.168:44387/qa_tiendajumex/Content/Assets/Images/"+item.ArtSku+".png"} alt=""/></div>
                                        <div class="mask">
                                         <Link to={'/detalleproducto/'+item.ArtSku}>
                                            <div class="info" alt="">
                                                DETALLE
                                           </div>
                                         </Link>
                                        </div>
                                    </div>
                                    <p class="m_2-produ">{item.ArtDesTv}</p>
                                        <div class="price">SKU: {item.ArtSku}</div>
                                        <div class="price_2">${item.ArtPVenta}.00 x 1 Caja</div>
                                        <Link to={'/detalleproducto/'+item.ArtSku}>
                                        <a class="agregar_pro" href='#'>Agregar al Carrito</a>
                                        </Link>
                                </div>
                               
                             </div>
                             {/* <span class="rating">{this.Califacion(item.ArtPuntuacion)}</span> */}
{/*                             
                             <ul className="list">
                                <li className="btnagregar">
                                    <label class="takemeon"/>
                                    <ul class="icon1 sub-icon1 profile_img">
                                    <li><a class="active-icon c1" href="#">AGREGAR </a>
                                        <ul class="sub-icon1 list">
                                            <li><h3>COMPRAR AHORA</h3><a href=""></a></li>
                                            <li><p>Solicita este producto sin iniciar sesión,  <a href="">solo con tu domicilio</a></p></li>
                                        </ul>
                                    </li>
                                    </ul>

                                </li>
                                </ul> */}
                               
                                <div class="clear"></div>
                                </a>
                             </div>
                        ))}
                       </div>
                      </div>
                </div>     
            </div>
            </div>
            <Footer></Footer>  

            </div>
            </>
                        
            </Route>
             
            )
       
        
    }

    componentDidMount(){
        this.CargarProductos().then(item=>{
            this.setState({
                productos:item[0]
            },()=>{
                console.log(this.state.productos);
            })
        });     
    }
    Califacion(unit){
       var califacion=unit
       var html=[];
       for(var i = 1; i < 6; i++){
           if(i<=califacion){
               var j= 5-i;
               html.push(<input type="radio" class="rating-input" id={"rating-input-1-"+j} name="rating-input-1"/>);
               html.push(<label for={"rating-input-1-"+j} class={"rating-star1"}></label>);
           }
           else{
            var j= 5-i;
            html.push(<input type="radio" class="rating-input" id={"rating-input-1-"+j} name="rating-input-1"/>);
            html.push(<label for={"rating-input-1-"+j} class={"rating-star"}></label>);
           }
       }
      return html

    }
    CargarProductos(){
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

}