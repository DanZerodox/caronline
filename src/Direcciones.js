import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import {Footer} from './componentes/Footer';
//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general="https://manzana.jumex.com.mx/qao_tienda_jumex/";
export class Direcciones extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token:'',
            direcciones:[],
            mostrar:false,
            direccion:'',
            municipio:'',
            cp:'',
            estado:'',
            colonia:'',
            referencia:'',
            mensaje:[],
            nombre:'',
            redirect: false,
            direccion_id:'',
            mostrarbtn:false

        }
        this.handleChangeDireccion=this.handleChangeDireccion.bind(this);
        this.handleChangeMunicipio=this.handleChangeMunicipio.bind(this);
        this.handleChangeCP=this.handleChangeCP.bind(this);
        this.handleChangeEstado=this.handleChangeEstado.bind(this);
        this.handleChangeColonia=this.handleChangeColonia.bind(this);
        this.handleChangeReferencia=this.handleChangeReferencia.bind(this);

    }
    handleChangeDireccion(event){
        this.setState({direccion:event.target.value},()=>console.log(this.state.direccion))
    }
    handleChangeMunicipio(event){
        this.setState({municipio:event.target.value},()=>console.log(this.state.municipio))
    }
    handleChangeCP(event){
        this.setState({cp:event.target.value},()=>console.log(this.state.cp))
    }
    handleChangeEstado(event){
        this.setState({estado:event.target.value},()=>console.log(this.state.estado))
    }
    handleChangeColonia(event){
        this.setState({colonia:event.target.value},()=>console.log(this.state.colonia))
    }  
    handleChangeReferencia(event){
        this.setState({referencia:event.target.value},()=>console.log(this.state.referencia))
    }
    render(){
        return(
            <Route>
                 
                <>
                {this.state.mostrar==false?
                 <div className='direcciones-panel'>
                    <Card>
                        <CardContent>
                         
                            <h2 class="direccion-title">Elige dónde recibir tus productos Jumex</h2>
                            <br></br>
                            <h4>En una de mis direcciones</h4>
                            
                            {this.state.direcciones.map(item=>(
                            <ul class="panel-direccion">
                                <li class="li-direccion">
                                    <div class="direccion-primer">CP {item.CP}</div>
                                    <div class="direccion-segundo">
                                        <span class="direccion-mun-col">{item.Direccion+" - "+item.Colonia+", "+item.Municipio}</span>
                                    </div>
                                    <div class="direccion-segundo">
                                        <span class="direccion-mun-col">{this.state.nombre}</span>
                                    </div>
                                    <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion(item.DirId)} type="radio"></input></div>
                                </li>  
                                <div class="editar-direccion">
                                    <a href="#"><span class="direccion-edicion">Editar dirección</span></a>
                                </div> 
                            </ul>
                            ))}
                            <br></br>
                            <h4>En otra ubicación</h4>
                            <ul class="panel-direccion">
                                <div class="editar-direccion">
                                <span class="icon-link__icon">
                                    <svg class="button-icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.8">
                                        <path class="button-icon__path" d="M8.599,2.00067031 L8.599,7.40067031 L13.999,7.40067031 L13.999,8.60067031 L8.599,8.60067031 L8.599,14.0006703 L7.399,14.0006703 L7.399,8.60067031 L1.999,8.60067031 L1.999,7.40067031 L7.399,7.40067031 L7.399,2.00067031 L8.599,2.00067031 Z" fill="#000000" fill-rule="nonzero">
                                     </path></g></svg>
                                </span>
                                    <a href="#" onClick={()=>this.MostrarVentanaAgregar()}><span class="direccion-edicion">Agregar una nueva dirección completa</span></a>
                                </div> 
                            </ul>
                           {this.state.mostrarbtn==true?
                            <Link to={"/resumen"}>
                            <button class="btnregistro">Continuar</button>
                            </Link>
                            : null
                            }
                            <Link to={'/contenidocarrito'}>
                                            <a href="#" className="regresar"  class="regresar">Regresar</a>
                                            </Link>
                            {this.state.redirect==true?
                              <Redirect push to={'/direcciones'}></Redirect>
                                :null
                            }                
                        </CardContent>
                    </Card>
                    {/* <Footer></Footer> */}
                 </div>
                    :
                    <div className='primer-panel'>
                    <Card>
                        <CardContent>
                            <Formik>
                                <Form>
                                    <h1>Registra tu <b>Dirección de  entrega</b></h1>
                                    <div class="datosgeneralesregistro">
                                          <Box>
                                          <Field name="direccion" onChange={this.handleChangeDireccion} value={this.state.direccion} component={TextField} label="Calle"></Field>
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="municipio" onChange={this.handleChangeMunicipio} value={this.state.municipio}  component={TextField} label="Municipio"></Field> 
                                          </Box>
                                        
                                          <Box>
                                          <Field name="cp" onChange={this.handleChangeCP} value={this.state.cp} component={TextField} label="C.P."></Field> 
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="estado" onChange={this.handleChangeEstado} value={this.state.estado}  component={TextField} label="Estado"></Field>    
                                      
                                          </Box>  
                                          <Box>
                                          <Field name="colonia" onChange={this.handleChangeColonia} value={this.state.colonia} component={TextField} label="Colonia"></Field> 
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          &nbsp;
                                          <Field name="referencia" onChange={this.handleChangeReferencia} value={this.state.referencia}  component={TextField} label="Referencia"></Field> 
                                          </Box>
                                    </div>
                                                

                                </Form>
                            </Formik>
                            <button class="btnregistro" onClick={()=>this.ValidarDireccion()}>Registrar</button>
                                            <Link to={'/contenidocarrito'}>
                                            <a href="#" className="regresar"  class="regresar">Regresar</a>
                                            </Link>
                        </CardContent>
                    </Card>  
                  </div> 
                 
                 }
                                  
                </>
            </Route>           
            )
    }

    componentDidMount(){
        var token=localStorage.getItem("token");
        if(token != null){
            this.ProcesoInicial(token);
        }
    }
    
    GetIdDireccion(id){
        this.setState({
            direccion_id:id,
            mostrarbtn:true
        },()=>{
            localStorage.removeItem("direccion_id");
            localStorage.setItem("direccion_id",this.state.direccion_id);
        })
    }

    ProcesoInicial(token){
        this.CargarDirecciones(token).then(item=>{
            this.setState({
                direcciones:item,
                nombre:localStorage.getItem("nombre-usuario")
            },()=>{
                console.log(this.state.direcciones.length);
                if(this.state.direcciones.length==0){
                this.setState({
                    mostrar:true
                })
            }
        })    
        })   
    }

    ValidarDireccion(){
        var token=localStorage.getItem("token");
        this.RegistrarDireccion(token).then(item=>{
            this.setState({
                mensaje:item
            },()=>{
                if(this.state.mensaje.Estatus=="OK"){
                    this.ProcesoInicial(token);
                    this.setState({
                        mostrar:false
                    })
                }

            })
        })
    }
    RegistrarDireccion(token){
        var pro;
        const data={
            "Direccion":this.state.direccion.toString(),
            "Municipio":this.state.municipio.toString(),
            "CP":this.state.cp.toString(),
            "Estado":this.state.estado.toString(),
            "Colonia":this.state.colonia.toString(),
            "Referencia":this.state.referencia.toString()
        };
        console.log("mi array",data);
        const posturl=url_general+"api/Usuario/direccion/agregar";
        var result= new Promise(function(resolve,reject){
            fetch(posturl,{
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer '+token
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
    CargarDirecciones(token){
        var pro=[];
        const posturl=url_general+"api/Usuario/direccion";
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

    MostrarVentanaAgregar(){
        this.setState({
            mostrar:true
        })
    }
}