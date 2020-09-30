import React from 'react';
import { Card, CardContent, Typography, Box } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import {Footer} from './componentes/Footer';
import Media from 'react-media';
import Map from './componentes/Map';
import MapEditar from './componentes/MapEditar';
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
            mostrarbtn:false,
            tipo_entrega: 0,
            mostrarError:false,
            tipo_sitio:0,
            mostrarEdicion:false,
            latitud_gine: 0,
            longitud_gine: 0,
            ediccion:false

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

                {
                this.state.mostrarError==false?
                this.state.mostrar==false?
                 <div style={{display:'flex', justifyContent:'center'}}>
                    <Card style={{boxShadow:'0 0  black'}}>
                        <CardContent>
                         
                            <h2 class="direccion-title">Elige dónde recibir tus productos Jumex</h2>
                            <br></br>
                            <h4>En una de mis direcciones</h4>
                            
                            {this.state.direcciones.map(item=>(
                                <Media queries={{iphone:{maxWidth:400},small:{maxWidth:480},medium:{maxWidth:1300},large:{maxWidth:1600}}}>
                                    {
                                        matches=>
                                            matches.iphone?
                                            (
                                                <ul class="panel-direccion" style={{height:260}}>
                                                <li class="li-direccion">
                                                    <div class="direccion-primer">CP {item.CP}</div>
                                                    <div class="direccion-segundo">
                                                        <span class="direccion-mun-col">{item.Direccion+" - "+item.Colonia+", "+item.Municipio}</span>
                                                    </div>
                                                    <div class="direccion-segundo">
                                                        <span class="direccion-mun-col">{this.state.nombre}</span>
                                                    </div>
                                                    <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion(item.DirId,0)} type="radio"></input></div>
                                                </li>  
                                                <div class="editar-direccion">
                                                    <label onClick={()=>this.EditarDireccion()}><span class="direccion-edicion">Editar dirección</span></label>
                                                </div> 
                                            </ul> 
                                            )
                                            :
                                            (
                                                matches.small?(
                                                    <ul class="panel-direccion" style={{height:188}}>
                                                        <li class="li-direccion">
                                                            <div class="direccion-primer">CP {item.CP}</div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{item.Direccion+" - "+item.Colonia+", "+item.Municipio}</span>
                                                            </div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{this.state.nombre}</span>
                                                            </div>
                                                            <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion(item.DirId,0)} type="radio"></input></div>
                                                        </li>  
                                                        <div class="editar-direccion">
                                                            <label onClick={()=>this.EditarDireccion()}><span class="direccion-edicion">Editar dirección</span></label>
                                                        </div> 
                                                    </ul> 
                                                ):
                                                (
                                                   matches.medium?(
                                                    <>
                                                    <ul class="panel-direccion">
                                                        <li class="li-direccion">
                                                            <div class="direccion-primer">CP {item.CP}</div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{item.Direccion+" - "+item.Colonia+", "+item.Municipio}</span>
                                                            </div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{this.state.nombre}</span>
                                                            </div>
                                                            <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion(item.DirId,0)} type="radio"></input></div>
                                                        </li>  
                                                        <div class="editar-direccion">
                                                            <label onClick={()=>this.EditarDireccion()}><span class="direccion-edicion">Editar dirección</span></label>
                                                        </div> 
                                                    </ul>
                                                    </>
                                                   ) :
                                                   (
                                                    <ul class="panel-direccion">
                                                        <li class="li-direccion">
                                                            <div class="direccion-primer">CP {item.CP}</div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{item.Direccion+" - "+item.Colonia+", "+item.Municipio}</span>
                                                            </div>
                                                            <div class="direccion-segundo">
                                                                <span class="direccion-mun-col">{this.state.nombre}</span>
                                                            </div>
                                                            <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion(item.DirId,0)} type="radio"></input></div>
                                                        </li>  
                                                        <div class="editar-direccion">
                                                            <label onClick={()=>this.EditarDireccion()}><span class="direccion-edicion">Editar dirección</span></label>
                                                        </div> 
                                                    </ul>
                                                   )
                                                )
                                            )
                                    }
                                </Media>
                            ))}
                           {this.state.tipo_sitio==0?
                            <>
                            <br></br>
                            <ul class="panel-direccion">
                                <li class="li-direccion">
                                    <div class="direccion-primer">En oficina</div>
                                    <div class="direccion-segundo">
                                        <span class="direccion-mun-col">Xalostoc</span>
                                    </div>
                                  
                                    <div><input class="radio-direccion" onClick={()=>this.GetIdDireccion("",1)}  type="radio"></input></div>
                                </li>  
                    
                            </ul>
                            </>
                            :
                            null
                            }
                            <br></br>
                            <h4>En otra ubicación</h4>
                            <Media queries={{small:{maxWidth:480}, medium:{maxWidth:1300}, large:{maxWidth:1600}}}>
                                {
                                    matches=>
                                        matches.small?(   
                                        <ul class="panel-direccion" style={{height:70}}>
                                            <div class="editar-direccion">
                                            <span style={{width:25}} class="icon-link__icon">
                                                <svg class="button-icon" style={{width:22, height:15}} viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.8">
                                                    <path class="button-icon__path" d="M8.599,2.00067031 L8.599,7.40067031 L13.999,7.40067031 L13.999,8.60067031 L8.599,8.60067031 L8.599,14.0006703 L7.399,14.0006703 L7.399,8.60067031 L1.999,8.60067031 L1.999,7.40067031 L7.399,7.40067031 L7.399,2.00067031 L8.599,2.00067031 Z" fill="#000000" fill-rule="nonzero">
                                                </path></g></svg>
                                            </span>
                                            <label onClick={()=>this.MostrarVentanaAgregar()}><span class="direccion-edicion">Agregar una nueva dirección completa</span></label>
                                            </div> 
                                        </ul>
                                        ):
                                        (
                                            matches.medium?(
                                                <ul class="panel-direccion">
                                                    <div class="editar-direccion">
                                                    <span style={{width:25}} class="icon-link__icon">
                                                        <svg class="button-icon" style={{width:22, height:15}} viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.8">
                                                            <path class="button-icon__path" d="M8.599,2.00067031 L8.599,7.40067031 L13.999,7.40067031 L13.999,8.60067031 L8.599,8.60067031 L8.599,14.0006703 L7.399,14.0006703 L7.399,8.60067031 L1.999,8.60067031 L1.999,7.40067031 L7.399,7.40067031 L7.399,2.00067031 L8.599,2.00067031 Z" fill="#000000" fill-rule="nonzero">
                                                        </path></g></svg>
                                                    </span>
                                                        <label onClick={()=>this.MostrarVentanaAgregar()}><span class="direccion-edicion">Agregar una nueva dirección completa</span></label>
                                                    </div> 
                                                </ul>
                                            ):
                                            (
                                                <ul class="panel-direccion">
                                                    <div class="editar-direccion">
                                                    <span style={{width:25}} class="icon-link__icon">
                                                        <svg class="button-icon" style={{width:22, height:15}} viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.8">
                                                            <path class="button-icon__path" d="M8.599,2.00067031 L8.599,7.40067031 L13.999,7.40067031 L13.999,8.60067031 L8.599,8.60067031 L8.599,14.0006703 L7.399,14.0006703 L7.399,8.60067031 L1.999,8.60067031 L1.999,7.40067031 L7.399,7.40067031 L7.399,2.00067031 L8.599,2.00067031 Z" fill="#000000" fill-rule="nonzero">
                                                        </path></g></svg>
                                                    </span>
                                                        <label onClick={()=>this.MostrarVentanaAgregar()}><span class="direccion-edicion">Agregar una nueva dirección completa</span></label>
                                                    </div> 
                                                </ul>
                                            )
                                        )
                                }
                            </Media>
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
                  this.state.mostrarEdicion==false?
                    <Media queries={{small:{maxWidth:480}}}>
                        {matches=>
                            matches.small?(
                                <div className='primer-panel' style={{margin:15, marginBottom:125}}>
                                <Map
                                    google={this.props.google}
                                    center={{lat: 19.561498, lng: -99.048539}}
                                    height='300px'
                                    zoom={15}
                                ></Map>
                                 <button class="btnregistro" onClick={()=>this.ValidarDireccion()}>Registrar</button>
                                                        <Link to={'/contenidocarrito'}>
                                                        <a href="#" className="regresar"  class="regresar">Regresar</a>
                                                        </Link>
                                </div> 
                            ):(

                            <div className='primer-panel' style={{marginBottom:70, margin:60}}>
                                <Map
                                google={this.props.google}
                                center={{lat: 19.561498, lng: -99.048539}}
                                height='300px'
                                zoom={15}
                                ></Map>
                                <button class="btnregistro" onClick={()=>this.ValidarDireccion()}>Registrar</button>
                                                        <Link to={'/contenidocarrito'}>
                                                        <a href="#" className="regresar"  class="regresar">Regresar</a>
                                                        </Link>
                            </div> 
                            )
                        }
                    </Media>
                  :
                    this.state.direcciones.map(item=>(
                        <Media queries={{small:{maxWidth:480}}}>
                        {matches=>
                            matches.small?(
                                <div className='primer-panel' style={{margin:15, marginBottom:125}}>
                                <MapEditar
                                    google={this.props.google}
                                    center={{lat: Number(item.Longitud), lng: Number(item.Latitud)}}
                                    height='300px'
                                    zoom={15}
                                ></MapEditar>
                                 <button class="btnregistro" onClick={()=>this.CorrerProcesoEditar()}>Editar</button>
                                                    <Link to={'/contenidocarrito'}>
                                                    <a href="#" className="regresar"  class="regresar">Regresar</a>
                                                    </Link>
                                </div> 
                            ):(
    
                            <div className='primer-panel' style={{marginBottom:70, margin:60}}>
                        
                            <MapEditar
                            google={this.props.google}
                            center={{lat: Number(item.Longitud), lng: Number(item.Latitud)}}
                            height='300px'
                            zoom={15}
                            ></MapEditar>
                            <button class="btnregistro" onClick={()=>this.CorrerProcesoEditar()}>Editar</button>
                                                    <Link to={'/contenidocarrito'}>
                                                    <a href="#" className="regresar"  class="regresar">Regresar</a>
                                                    </Link>
                        </div> 
                            
                         
                            )
                        }
                        </Media>
                    ))
                 :
                 <div className='primer-panel'>
                    <Card>
                        <CardContent>
                        <div class="mensajefinal">
                        <img class="circlegreen" src={require('./images/Jumex/tache.png')}></img>
                        <p>Ha ocurrido un error</p>
                        <p>{this.state.mensaje.Mensaje}</p>
                        <Link to={'/formulariocompra'}><p>Regresar</p></Link>
                        <img class="circlegreen" src={require('./images/Jumex/tucan.png')}></img>
                        </div>
                        </CardContent>
                    </Card>
                </div> 
                 }
                 
                <Footer></Footer>                  
                </>
            </Route>           
            )
    }

    componentDidMount(){
        var token=localStorage.getItem("token");
        var tipo_sitio=localStorage.getItem("tipo_sitio");
        console.log(token);
        if(token != null){
            this.setState({tipo_sitio:tipo_sitio});
            this.ProcesoInicial(token);
           
        }

    }

    habilitargooglemaps(){
      if(this.state.ediccion==true){
        this.setState({ediccion:false})
      }
      else{
        this.setState({ediccion:true})
      }
    }
    
    GetIdDireccion(id,tipo){
        this.setState({
            direccion_id:id,
            mostrarbtn:true,
            tipo_entrega:tipo
        },()=>{
            if(this.state.tipo_entrega==0){
                this.state.direcciones.map(item=>{
                    if(item.DirId==id){
                        localStorage.removeItem("direccion_id");
                        localStorage.setItem("direccion_id",this.state.direccion_id);
                        localStorage.removeItem("direccion_objeto");
                        localStorage.setItem("direccion_objeto",JSON.stringify(this.state.direcciones));
                    }
                })
            }
            localStorage.removeItem("tipo_entrega");
            localStorage.setItem("tipo_entrega",this.state.tipo_entrega);
        })
    }

    ProcesoInicial(token){
        this.CargarDirecciones(token).then(item=>{
            this.setState({
                direcciones:item,
                nombre:localStorage.getItem("nombre-usuario")
            },()=>{
                console.log('estas son las direcciones',this.state.direcciones);
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
                        mostrar:false,
                        mostrarError:false
                    })
                }
                else{
                    this.setState({
                        mostrarError:true
                    })    
                }

            })
        })
    }
    RegistrarDireccion(token){
        var pro;
        // const data={
        //     "Direccion":this.state.direccion.toString(),
        //     "Municipio":this.state.municipio.toString(),
        //     "CP":this.state.cp.toString(),
        //     "Estado":this.state.estado.toString(),
        //     "Colonia":this.state.colonia.toString(),
        //     "Referencia":this.state.referencia.toString()
        // };
        var data=JSON.parse(localStorage.getItem("insertar_direccion"));
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
            mostrar:true,
            mostrarEdicion:false
        })
    }

    EditarDireccion(){
      this.setState({mostrar:true,mostrarEdicion:true})
    }

    CorrerProcesoEditar(){
        var token=localStorage.getItem("token");

        this.EdicionG(token).then(item=>{
            this.setState({
                mensaje:item
            },()=>{
                if(this.state.mensaje.Estatus=="OK"){
                    this.ProcesoInicial(token);
                    this.setState({
                        mostrar:false,
                        mostrarError:false
                    })
                }
                else{
                    this.setState({
                        mostrarError:true
                    })    
                }

            })
        })
    }

    EdicionG(token){
        var pro;
        var id_direccion=this.state.direcciones[0].DirId;
        console.log("ID",id_direccion);
        var data=JSON.parse(localStorage.getItem("editar_direccion"));
        console.log("mi array",data);
        const posturl=url_general+"api/Usuario/direccion/"+id_direccion;
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
}