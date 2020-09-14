import React from 'react';
import {render} from 'react-dom';
import { Component } from "react";
// import '../App.css';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class HeadTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mostrar:false,
            perfil:[],
            redirect:false
        }
    }
    render(){
        return(
            <BrowserRouter>
            <Route>
             <>
             
            {this.state.mostrar==true?
            <div className="header-top">
                <div className="wrap-head"> 
                <div className="logo">
              
                    <img className="imagenlogo" onClick={()=>this.RegresarInicio()} src={require('../images/logo.png')} alt=""/>
                    {this.state.redirect==true?
                        <Redirect push to={'/'}></Redirect>
                        :null
                    }
                </div>
                <div className="cssmenu">
                    <ul>
                    <li><a href="#">Bienvenido</a></li>
                    <li><a href="#">{this.state.perfil.UsrNombre}</a></li>
                    </ul>
                </div>
                <div className="clear"></div>
                </div>
            </div>
                :
                <div className="header-top">
                <div className="wrap-head"> 
                <div className="logo">
             
                    <img className="imagenlogo" src={require('../images/logo.png')} alt=""/>
                    {this.state.redirect==true?
                        <Redirect push to={'/'}></Redirect>
                        :null
                    }
                </div>
                <div className="cssmenu">
                    <ul>
                    <li className="active"><a href="register.html">Registrate</a></li> 
                    <li>
                        <Link to={'/formulariocompra'}>
                        Mi Cuenta
                        </Link>                    
                    </li> 
                    <li><a href="checkout.html">Mi Carrito</a></li> 
                    </ul>
                </div>
                <div className="menu-respon">
                    <img className="cssimagen" src={require('../images/menu.png')}></img>
                </div>
                <div className="clear"></div>
                </div>
            </div>
            }
             </>
             </Route>
            </BrowserRouter>
        );
    }
    componentDidMount(){
        var token=localStorage.getItem("token");
        if(token!=null){
            this.CargarPerfil(token).then(item=>{
                this.setState({
                    perfil:item,
                    mostrar:true
                },()=>{
                    console.log("aqui esta el nombre",this.state.perfil.UsrNombre)
                    localStorage.setItem("nombre-usuario",this.state.perfil.UsrNombre);
                    
                })
            })    
           
        }
    }
    RegresarInicio(){
        this.setState({
            redirect:true
        },()=>{
            window.location.reload();
        })
    }

    CargarPerfil(token){
        var pro=[];
        const posturl=url_general+"api/Usuario/perfil";
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
                resolve(resp);
            });
        });

        return result;      
    }
}
