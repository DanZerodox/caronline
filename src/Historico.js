import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import {Footer} from './componentes/Footer';

export class Historico extends React.Component{
    constructor(props){
        super(props);
        this.state={
            compras:[],
            direccion:[]
        }
    }
    render(){
        return(
            <Route> 
                <div class="direccion-panel-h">
                            
                    <Card>
                        <CardContent>
                            <h2 class='direccion-title'>Mis Compras</h2>
                            <div class="morty-resumen">
                                {this.state.compras.map(item=>(
                                    item.Articulos.map(item2=>(
                                        <>
                                        <ul class="panel-direccion">
                                            <li class='li-direccion-h'>
                                               <div class='histo-title'>
                                               Tu producto esta en camino 
                                               </div>
                                               <div class="devolver-h">
                                                    <span class="direccion-mun-col">Puedes devolverlo antes del: No hay devoluciones</span>
                                                </div>
                                                <div class='histo-produc'>
                                                    <Link to={'/'}>
                                                        <h1>{item2.ArtDesTv}</h1>
                                                    </Link>
                                                <div>
                                                <span class="direccion-mun-col">SKU: {item2.ArtSku}</span>
                                                </div>
                                                <h2>${item2.TickDetSubTotal}.00 x {item2.TickDetCant} Cajas</h2>
                                                </div>
                                                <div class="vendido">
                                                    <span>Vendido por </span>
                                                    <Link to={'/'}>
                                                        Jumex
                                                    </Link>
                                                </div>
                                                <Link to={'/detalleproducto/'+item2.ArtSku}>
                                                <button class="btnfin-h">Comprar</button>
                                                </Link>
                                                <div class="imagen-resumen-h"><img  width={48} src={"https://192.168.224.168:44387/qa_tiendajumex/Content/Assets/Images/"+item2.ArtSku+".png"}></img></div>
                                            </li>
                                        </ul>
                                        </>    
                                    ))
                                   
                                ))}
                            </div>                       
                        </CardContent>
                    </Card>
                </div>
               <Footer></Footer>
            </Route>
        )
    }

    componentDidMount(){
        var token=localStorage.getItem("token");
        var compras=localStorage.getItem("compras");
        var direccion=localStorage.getItem("direccion");
        if(token!=null){
          if((compras != null)){
            var e=localStorage.getItem("compras");
              this.setState({
                  compras:JSON.parse(e),
                  direccion:direccion
              })
          }
        }
    }


}