import React from 'react';
import {render} from 'react-dom';
import { Component } from "react";
// import '../App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
export class HeadTop extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mostrar:false,
            perfil:[],
        }
    }
    render(){
        return(
            <BrowserRouter>
             <>
             
            {this.state.mostrar==true?
            <div className="header-top">
                <div className="wrap-head"> 
                <div className="logo">
                <Link to={"/"}>
                    <img className="imagenlogo" src={require('../images/logo.png')} alt=""/>
                </Link>
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
                <Link to={"/"}>
                    <img className="imagenlogo" src={require('../images/logo.png')} alt=""/>
                </Link>
                </div>
                <div className="cssmenu">
                    <ul>
                    <li className="active"><a href="register.html">Registrate</a></li> 
                    <li><a href="login.html">Mi Cuenta</a></li> 
                    <li><a href="checkout.html">Mi Carrito</a></li> 
                    </ul>
                </div>
                <div className="clear"></div>
                </div>
            </div>
            }
             </>
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
                    console.log(this.state.perfil.UsrNombre)
                    localStorage.setItem("nombre-usuario",this.state.perfil.UsrNombre);
                })
            })    
           
        }
    }

    CargarPerfil(token){
        var pro=[];
        const posturl="https://192.168.224.168:44387/qa_tiendajumex/api/Usuario/perfil";
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
