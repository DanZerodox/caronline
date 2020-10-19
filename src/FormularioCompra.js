import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Footer } from './componentes/Footer';
import * as Yup from 'yup';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import * as Constantes from './componentes/Constantes';

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = Constantes.url_general;
export class FormularioCompra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inicio: true,
            direccion: false,
            resumen: false,
            productosencarrito: [],
            token: [],
            contrasena: '',
            correo: '',
            mensaje: [],
            mensajepro: [],
            productocanasta: [],
            cantidad: 0,
            mostrarcompra: false,
            redirect: false,
            sitio: '',
            tipo_sitio: 0,
            height: 0,
            carritoBD:[],
            mostrarerror:false,
            mensajeerror:''

        }


        this.handleChangeContrasena = this.handleChangeContrasena.bind(this);
        this.handleChangeCorreo = this.handleChangeCorreo.bind(this);

    }
    handleChangeCorreo(event) {
        this.setState({ correo: event.target.value }, () => console.log(this.state.correo))
    }
    handleChangeContrasena(event) {
        this.setState({ contrasena: event.target.value }, () => console.log(this.state.contrasena))
    }


    render() {

        return (
        
            <>
                <div style={{ padding: '60px 0' }} className="Login">
                    <form style={{ margin: '0 auto', maxWidth: 320 }}>
                        <FormGroup controlId="email" bsSize="large">
                            <label>Correo</label>
                            <FormControl
                                autoFocus
                                type="email"
                                onChange={this.handleChangeCorreo}
                                value={this.state.correo}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <label>Contraseña</label>
                            <FormControl
                                type="password"
                                onChange={this.handleChangeContrasena}
                                value={this.state.contrasena}
                            />
                        </FormGroup>
                        {this.state.mostrarerror==true?
                        <label style={{color:'red'}}>{this.state.mensajeerror}</label>
                        :    
                            null
                        }
                        <Button block bsSize="large" onClick={() => this.IniciarSesion()}>
                            Iniciar Sesión
                        </Button>
                        <br></br>
                        <Link to={"/registrocuenta"}> <p>¿No tienes cuenta? Registrate Aquí</p></Link>
                    </form>
                </div>
                <Footer></Footer>
                {this.state.redirect == true ?
                    <Redirect push to={'/contenidocarrito'}></Redirect>
                    : null}
            </>
        )
    }

    componentDidMount() {
        this.resize();
        if (localStorage.getItem("token") != null) {
            this.setState({
                redirect: true
            })
        }
    }

    IniciarSesion() {
        this.ValidarDatos().then(item => {
            console.log("zero",item);
            this.setState({
                token: item[0],
                sitio: item[0].Sitio,
                tipo_sitio: item[0].TipoEntrega[0].TipoEntrega

            }, () => {
                localStorage.setItem("tipo_sitio", this.state.tipo_sitio);
                console.log(this.state.sitio);
                console.log(this.state.tipo_sitio);
                if (this.state.token.Estatus == "OK") {
                    localStorage.setItem("token", this.state.token.AccessToken);
                    
                    window.location.reload();

                    this.setState({
                        redirect:true
                    })

                }
                else{
                       this.setState({
                           mostrarerror:true,
                           mensajeerror:item[0].Mensaje
                       }) 
                }
            })
        })
    }

    ConsultarCarritoBD(token){
        var pro = [];
        const posturl = url_general + "api/Carrito/consultar";
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
                    console.log('ya quedo'+pro)
                    resolve(pro);
                });
        });

        return result;
    }

    ValidarDatos() {
        var pro = [];
        const data = {
            "Usuario": this.state.correo,
            "Password": this.state.contrasena
        }
        const posturl = url_general + "api/Usuario/validar";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (res) => res.json()

            )
                .catch(error => console.log('Error', error))
                .then(resp => {
                    pro.push(resp);
                    resolve(pro);
                });
        });

        return result;
    }

    resize() {
        const height = window.innerWidth;
        if (height > 1900) {
            this.setState({ height: 1000, width: 727 })
        }
        else if (height < 1500) {
            this.setState({ height: 168, width: 485, marginLeft: 85 })
        } else {
            this.setState({ height: 168, width: 582, marginLeft: 148 })
        }
        console.log(height);
    }
}
