import React from 'react';
import {render} from 'react-dom';
import { Component } from "react";
// import '../App.css';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';



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
             <Navbar  expand="lg" style={{backgroundColor:'#10266b'}}>
                <Navbar.Brand>
                    <Link to={'/'}>
                    <img src={require('../images/logo.png')} style={{width:100}}></img>    
                    </Link> 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home" style={{color:"white", marginLeft:'auto'}}>Iniciar Sesión</Nav.Link>
                    {/* <Nav.Link href="#link" style={{color:"white"}}>Link</Nav.Link>
                    <NavDropdown style={{borderRight:'none'}} title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    </Nav>
                    {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form> */}
                </Navbar.Collapse>
                </Navbar>
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
