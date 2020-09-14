import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { Footer } from './componentes/Footer';
import * as Yup from 'yup';
//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";
export class FormularioCompra extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inicio:true,
            direccion:false,
            resumen:false,
            productosencarrito:[],
            token:[],
            contrasena:'',
            correo:'',
            mensaje:[],
            mensajepro:[],
            productocanasta:[],
            cantidad:0,
            mostrarcompra:false,
            redirect:false,
            sitio:'',
            tipo_sitio:0
        }

        
        this.handleChangeContrasena=this.handleChangeContrasena.bind(this);
        this.handleChangeCorreo=this.handleChangeCorreo.bind(this);
      
    }
    handleChangeCorreo(event){
        this.setState({correo:event.target.value},()=>console.log(this.state.correo))
    }
    handleChangeContrasena(event){
        this.setState({contrasena:event.target.value},()=>console.log(this.state.contrasena))
    }
    
   
    render(){
        const validaciones=Yup.object().shape({
            email: Yup.string()
            .email('Invalid email')
            .required('Ingresa tu correo'),
           
        });
        
        return(
          <Route>
                 <div className="primer-panel">
                   <Card>
                         <CardContent>
                             <Formik
                               initialValues={{
                                 email: '',
                               }}
                               validationSchema={validaciones}
                             >
                                 <Form class="monorin">
                                    <h1 class="txt">Iniciar Sesión</h1>
                                     <div class="seccion-p1">
                                        <Field id="txtp1" name="email" type="email" onChange={this.handleChangeCorreo} value={this.state.correo} component={TextField} label="Correo Electronico"></Field>
                                         &nbsp;
                                         &nbsp;
                                         &nbsp;
                                         &nbsp;
                                         &nbsp;
                                         &nbsp;
                                        <Field id="txtp1" name="contrasena" type="password" onChange={this.handleChangeContrasena} value={this.state.contrasena} component={TextField} label="Contraseña"></Field>
                                        
                                     </div>
                                        <label className="error_mensaje">{this.state.token.Mensaje}</label>

                                     <Link to={"/registrocuenta"}> <p class="registrarse">¿No tienes cuenta? Registrate Aquí</p></Link>
                                     {/* <div class="omitir"><a href="#" onClick={()=>this.MostrarDireccion()}>Omitir</a></div> */}
                                 </Form>
                             </Formik>
                             <button className="btnloginresponsive" onClick={()=>{this.IniciarSesion()}}>Ingresar</button>

                         </CardContent>
                     </Card>
                   </div>
                   <Footer></Footer>
                   {this.state.redirect==true?
                    <Redirect push to={'/contenidocarrito'}></Redirect>
                    :null
                    }
          </Route>
        )
    }

    componentDidMount(){
        if(localStorage.getItem("token")!=null){
            this.setState({
                redirect:true
            })
        }
    }

    IniciarSesion(){
         this.ValidarDatos().then(item=>{
             this.setState({
                 token:item[0],
                 sitio:item[0].Sitio,
                 tipo_sitio:item[0].TipoEntrega[0].TipoEntrega

             },()=>{
                 localStorage.setItem("tipo_sitio",this.state.tipo_sitio);
                 console.log(this.state.sitio);
                 console.log(this.state.tipo_sitio);
                if(this.state.token.Estatus=="OK"){
                localStorage.setItem("token",this.state.token.AccessToken);  
                window.location.reload(); 
                }
             })
         })   
    }

    ValidarDatos(){
        var pro=[];
        const data={
            "Usuario":this.state.correo,
            "Password":this.state.contrasena
        }
        const posturl=url_general+"api/Usuario/validar";
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
                pro.push(resp);
                resolve(pro);
            });
        });

        return result;              
    }
}
