import React from 'react';
import { Card, CardContent, Typography, Box, colors } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as Constantes from './componentes/Constantes';

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general= Constantes.url_general;
export class FormularioRegistro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            apellido:'',
            telefono:'',
            correo:'',
            contrasena:'',
            confirmcontrasena:'',
            respuesta:[],
            mostrar:false,
            tipomensaje:false,
            errormensaje:false,
            errormensajelocal:false,
            MensajeLocal:''

        }
        this.handleChangeNombre=this.handleChangeNombre.bind(this);
        this.handleChangeApellidos=this.handleChangeApellidos.bind(this);
        this.handleChangeTelefono=this.handleChangeTelefono.bind(this);
        this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
        this.handleChangeContrasena=this.handleChangeContrasena.bind(this);
        this.handleChangeConfirmContrasena=this.handleChangeConfirmContrasena.bind(this);
    }
    handleChangeNombre(event){
        this.setState({nombre:event.target.value},()=>console.log(this.state.nombre))
    }
    handleChangeApellidos(event){
        this.setState({apellido:event.target.value},()=>console.log(this.state.apellido))
    }
    handleChangeTelefono(event){
        this.setState({telefono:event.target.value},()=>console.log(this.state.telefono))
    }
    handleChangeCorreo(event){
        this.setState({correo:event.target.value},()=>console.log(this.state.correo))
    }
    handleChangeContrasena(event){
        this.setState({contrasena:event.target.value},()=>console.log(this.state.contrasena))
    }  
    handleChangeConfirmContrasena(event){
        this.setState({confirmcontrasena:event.target.value},()=>console.log(this.state.confirmcontrasena))
    }
    render(){
        
        return(
            <Route>
                <>
                {this.state.mostrar==false?
                  <div className='primer-panel'>
                    <Card>
                        <CardContent>
                            <Formik>
                                <Form>
                                    <h1>Registra tus <b>Datos Generales</b></h1>
                                    <div class="datosgeneralesregistro">
                                          <Box>
                                          <Field name="name" onChange={this.handleChangeNombre} value={this.state.nombre} component={TextField} label="Nombre"></Field>
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="apellidos" onChange={this.handleChangeApellidos} value={this.state.apellido}  component={TextField} label="Apellidos"></Field> 
                                          </Box>
                                        
                                          <Box>
                                          <Field name="telefono" onChange={this.handleChangeTelefono} value={this.state.telefono} component={TextField} label="Télefono"></Field> 
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="correo" onChange={this.handleChangeCorreo} value={this.state.correo}  component={TextField} label="Correo Electronico"></Field>    
                                      
                                          </Box>  
                                          <Box>
                                          <Field name="contrasena" type="password" onChange={this.handleChangeContrasena} value={this.state.contrasena} component={TextField} label="Contraseña"></Field> 
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="contrasena2" type="password" onChange={this.handleChangeConfirmContrasena} value={this.state.confirmcontrasena}  component={TextField} label="Confirma Contraseña"></Field> 
                                          </Box>
                                          {this.state.errormensajelocal==true?
                                             <>
                                             <br></br>
                                             <label class="error_mensaje">{this.state.MensajeLocal} </label>
                                             </>   
                                            :null
                                            }
                                            {this.state.errormensaje==true?
                                            <>
                                                  <br></br>
                                             <label class="error_mensaje">{this.state.respuesta.Mensaje} </label>    
                                            </>
                                            :null
                                            }
                                    </div>
                                                

                                </Form>
                            </Formik>
                            <button class="btnregistro" onClick={()=>this.ValidarDatosUsuario()}>Registrar</button>
                                            <Link to={'/formulariocompra'}>
                                            <a href="#" className="regresar"  class="regresar">Regresar</a>
                                            </Link>
                        </CardContent>
                    </Card>    
                  </div>  
                  :
                    this.state.tipomensaje==true?
                    <div className='primer-panel'>
                    <Card>
                        <CardContent>
                        <div class="mensajefinal">
                         <img class="circlegreen" src={require('./images/Jumex/ok.png')}></img>
                         <p>Te has registrado de manera correcta</p>
                         <Link to={'/formulariocompra'}><p>Iniciar Sesión</p></Link>
                         <img class="circlegreen" src={require('./images/Jumex/tucan.png')}></img>
                        </div>
                        </CardContent>
                    </Card>
                </div>  :
                  <div className='primer-panel'>
                  <Card>
                      <CardContent>
                      <div class="mensajefinal">
                       <img class="circlegreen" src={require('./images/Jumex/tache.png')}></img>
                        <p>{this.state.respuesta.Mensaje}</p>
                       <img class="circlegreen" src={require('./images/Jumex/tucan.png')}></img>
                      </div>
                      </CardContent>
                  </Card>
              </div> 
                   
                }
                </>
            </Route>
        )
    }

    ValidarDatosUsuario(){
        if(this.state.correo == ''){
            var mensaje='El correo no puede ir vacío';
            this.setState({
                MensajeLocal:mensaje,
                errormensajelocal:true
            })    
        }
        else if(this.state.contrasena==''){
            var mensaje='Contraseña no puede ir vacío';
            this.setState({
                MensajeLocal:mensaje,
                errormensajelocal:true
            })    
        }
        else if(this.state.contrasena != this.state.confirmcontrasena){
            var mensaje='Las contraseñas no coinciden';
            this.setState({
                MensajeLocal:mensaje,
                errormensajelocal:true
            })    
        }
       
        else{
           this.RegistrarUsuario().then(result=>{
                this.setState({
                    respuesta:result
                },()=>{
                    if(this.state.respuesta.Estatus=="OK"){
                        this.setState({
                            mostrar:true,
                            tipomensaje:true
                        })    
                    }
                    else{
                        this.setState({
                            errormensaje:true
                        })
                    }
                })
           });
        }
    }

    RegistrarUsuario(){
        const data={
            "Usuario":this.state.correo,
            "Password":this.state.contrasena,
            "Nombre": this.state.nombre+" "+this.state.apellido
        }
        const posturl=url_general+"api/Usuario/registrar";
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ 
                    'Content-Type':'application/json'
                }
            }).then(
                (res)=>res.json()

            )
            .catch(error=>console.log('Error',error))
            .then(resp=>{
              
                resolve(resp);
            });
        });

        return result;              
    }
}