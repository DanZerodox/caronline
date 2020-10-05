import * as React from 'react';
import { BrowserRouter, Route, Link, Redirect, HashRouter } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Carousel, { consts } from 'react-elastic-carousel';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { DetalleProducto } from "../DetalleProducto";
import { useHistory } from "react-router-dom";


var url_general = "https://manzana.jumex.com.mx/qao_tienda_jumex/";


export class Carusel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            productossugeridos: [],
        }
    }
    render() {
        return (
            <>
                <>
                    <Carousel itemsToScroll={8} itemsToShow={3}>
                        {this.state.productossugeridos.map((item) => (
                            <Card style={{ padding: 15 }}>
                                <Typography>{item.ArtDesTv}</Typography>
                                <CardActionArea>
                                    <CardMedia style={{
                                        height: 115,
                                        backgroundSize: 'contain',
                                        backgroundPositionX: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }} image={url_general + "Content/Assets/Images/" + item.ArtSku + ".png"}></CardMedia>
                                </CardActionArea>
                                <Typography style={{ color: '#ffaf02' }}>SKU: {item.ArtSku}</Typography>
                                <Typography variant="h6">${item.ArtPVenta}.00</Typography>
                                {/* <Link  to={"/detalleproducto/" + item.ArtSku} onClick={()=>this.Refresh()}>
                                  
                                </Link> */}
  <Button variant="outlined" color="primary">
                                        Agregar
                            </Button>
                            </Card>


                        ))}
                    </Carousel>
                </>
            </>
        );
    }

    componentDidMount(){
        this.CargarProductosSugeridos().then(item=>{
            this.setState({productossugeridos:item[0]})           
        })
    }

    Refresh(){

        window.history.replaceState(null,"hola","http://localhost:3000/detalleproducto/100105")
    }
    
    CargarProductosSugeridos() {
        var pro = [];
        const posturl = url_general + "api/Articulo/sugeridos";
        var result = new Promise(function (resolve, reject) {
            fetch(posturl, {
                method: 'GET',
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
                })
        });

        return result;
    }

}