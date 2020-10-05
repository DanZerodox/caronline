import React from 'react';
import { render } from 'react-dom';
import { Component } from "react";
// import '../App.css';
import { BrowserRouter, Route, Link, Redirect, HashRouter } from "react-router-dom";
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
var url_general = "https://manzana.jumex.com.mx/qao_tienda_jumex/";

export class HeadTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrar: false,
            perfil: [],
            redirect: false,
            redirigir: false,
            cerrar: false
        }
    }
    render() {
        return (
            <HashRouter>
                <Route>
                    <>
                        <Navbar expand="lg" style={{ backgroundColor: '#10266b' }}>
                            <Navbar.Brand>
                                <Link to={'/'}>
                                    <img src={require('../images/logo.png')} style={{ width: 100 }}></img>
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    {this.state.perfil != "" ?
                                        <>
                                            <Nav.Link style={{ color: '#ffffff' }} href="#inic">{this.state.perfil.UsrNombre}</Nav.Link>
                                            <Nav.Link to={'/historico'} style={{ color: '#ffffff' }}>Mis Pedidos</Nav.Link>
                                            <Nav.Link style={{ color: '#ffffff' }} href="#" onClick={() => this.CerrarSesion()}>Cerrar Sesión</Nav.Link>
                                        </>
                                        :
                                        <>
                                            <Nav.Link style={{ color: "white", marginLeft: 'auto' }}>
                                                <Link push to={'/formulariocompra'} style={{color:'#ffffff'}}>
                                                    Iniciar Sesión

                                                </Link>
                                            </Nav.Link>
                                        </>
                                    }
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
                        {this.state.redirigir == true ?
                            <Redirect push to={'/formulariocompra'}></Redirect>
                            : null
                        }
                        {this.state.cerrar == true ?
                            <Redirect to={'/'}></Redirect>
                            : null
                        }
                    </>
                </Route>
            </HashRouter>
        );
    }
    componentDidMount() {
        var token = localStorage.getItem("token");
        if (token != null) {
            this.CargarPerfil(token).then(item => {
                this.setState({
                    perfil: item,
                    mostrar: true
                }, () => {
                    console.log("aqui esta el nombre", this.state.perfil.UsrNombre)
                    localStorage.setItem("nombre-usuario", this.state.perfil.UsrNombre);

                })
            })

        }
    }
    Redirigir() {
        this.setState({
            redirigir: true
        })
    }
    RegresarInicio() {
        this.setState({
            redirect: true
        }, () => {
            window.location.reload();
        })
    }

    CargarPerfil(token) {
        var pro = [];
        const posturl = url_general + "api/Usuario/perfil";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(
                (res) => res.json()

            )
                .catch(error => console.log('Error', error))
                .then(resp => {
                    pro.push(resp);
                    resolve(resp);
                });
        });

        return result;
    }
    CerrarSesion() {
        console.log('entro');
        localStorage.clear();
        this.setState({cerrar:true, perfil:""})

    }
}
