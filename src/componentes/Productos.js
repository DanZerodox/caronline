import { Component } from "react";
import React from 'react';
// import { Table, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Footer } from '../componentes/Footer';
import { Banner } from '../componentes/Banner';
import * as Constantes from '../componentes/Constantes';
import { BarraInicio } from '../componentes/BarraInicio';
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Media from 'react-media';

//QA
//var url_general="https://192.168.224.168:44387/qa_tiendajumex/";
//PRODUCCION
var url_general = "https://manzana.jumex.com.mx/qao_tienda_jumex/";

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center'
    }
})
function HoverRating() {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && <Box ml={2}></Box>}
        </div>
    );
}

export class Productos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            width: 30,
            heightcard: 314,
            padding: 144,
        }
    }

    render() {
        return (
            <Route>

                <>
                    <Media queries={{ quino: { maxWidth: 480 } }}>
                        {
                            matches =>
                                matches.quino ? (
                                    <div class="bodi-sus" style={{ backgroundColor: "#e5e8f0" }}>
                                        <div className="productoprincipal">
                                            <BarraInicio></BarraInicio>
                                            {/* <Banner></Banner> */}
                                            <div class="cell large-3 hide-for-xlarge paging-information">
                                                <div class="clp-all-title">
                                                    <span>Todo</span>

                                                </div>
                                            </div>
                                            <div class="division">
                                                <div class="filtros"></div>
                                            </div>
                                            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', padding: '20px ' + this.state.padding + 'px' }}>
                                                {
                                                    this.state.productos.map(item => (
                                                        <Card className='card' style={{ width: this.state.width + '%', height: this.state.heightcard, margin: 10, display: "inline-block" }}>
                                                            <CardActionArea>
                                                                <div style={{
                                                                    marginLeft: 8,
                                                                    fontWeight: "bold",
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    fontSize: 15,
                                                                    textOverflow: "ellipsis",
                                                                    padding: 10
                                                                }}>{item.ArtDesTv}
                                                                </div>
                                                                <Link to={'/detalleproducto/' + item.ArtSku}>
                                                                    <CardMedia style={{ height: this.state.heightimg, width: 80, marginLeft: this.state.leftimg + '%' }} image={Constantes.CONEXION_PRODUCCION + "Content/Assets/Images/" + item.ArtSku + ".png"}>

                                                                    </CardMedia>
                                                                </Link>
                                                                <CardContent style={{ height: 80 }}>
                                                                    {/* <div
                                                    style={{
                                                        marginLeft: 5,
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }}
                                                    >
                                                    {item.ArtDesTv}
                                                    </div> */}
                                                                    <div style={{ margin: 5 }}>Precio: ${item.ArtPVenta}.00 x 1 Caja</div>
                                                                    <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
                                                                        SKU: {item.ArtSku}
                                                                    </div>
                                                                </CardContent>
                                                                <CardActions
                                                                    style={{ display: "flex", alignItems: "center", height: 45, padding: '8px 15px' }}
                                                                >
                                                                    <Rating
                                                                        name="hover-feedback"
                                                                        value={2}
                                                                        precision={0.5}

                                                                    />
                                                                    <Media queries={{ iphone: { maxWidth: 400 }, small: { maxWidth: 1300 } }}>
                                                                        {matches =>
                                                                            matches.iphone ? (
                                                                                <Link to={'/detalleproducto/' + item.ArtSku}>
                                                                                    <Button style={{ marginLeft: 25 }}>Agregar</Button>
                                                                                </Link>
                                                                            )
                                                                                :
                                                                                (
                                                                                    matches.small ? (
                                                                                        <Link to={'/detalleproducto/' + item.ArtSku}>
                                                                                            <Button style={{ marginLeft: 48 }}>Agregar</Button>
                                                                                        </Link>
                                                                                    ) : (
                                                                                            <Link to={'/detalleproducto/' + item.ArtSku}>
                                                                                                <Button style={{ marginLeft: 118 }}>Agregar</Button>
                                                                                            </Link>
                                                                                        )
                                                                                )
                                                                        }
                                                                    </Media>

                                                                </CardActions>
                                                            </CardActionArea>
                                                        </Card>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <Footer></Footer>

                                    </div>
                                )
                                :(
                                    <div  style={{backgroundColor:"#e5e8f0"}}>
                                    <div className="productoprincipal">
                                    <BarraInicio></BarraInicio>
                                    {/* <Banner></Banner> */}
                                    <div class="cell large-3 hide-for-xlarge paging-information">
                                            <div class="clp-all-title">
                                            <span>Todo</span>
                        
                                            </div>
                                            </div>
                                    <div class="division">
                                        <div class="filtros"></div>
                                    </div>	
                                    <div className style={{display:'flex', flexWrap:'wrap', padding:'20px '+this.state.padding+'px'}}>
                                        {
                                             this.state.productos.map(item=>(
                                                <Card className='card' style={{ width: this.state.width+'%', height: this.state.heightcard, margin: 10, display: "inline-block" }}>
                                                    <CardActionArea>
                                                        <div style={{
                                                                marginLeft: 8,
                                                                fontWeight: "bold",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                fontSize: 15,
                                                                textOverflow: "ellipsis",
                                                                padding:10
                                                        }}>{item.ArtDesTv}
                                                        </div>
                                                       <Link to={'/detalleproducto/'+item.ArtSku}>
                                                           <CardMedia style={{height:this.state.heightimg, width:80, marginLeft:this.state.leftimg+'%'}} image={Constantes.CONEXION_PRODUCCION+"Content/Assets/Images/"+item.ArtSku+".png"}>
                        
                                                           </CardMedia>
                                                       </Link>
                                                        <CardContent style={{ height: 80 }}>
                                                            {/* <div
                                                            style={{
                                                                marginLeft: 5,
                                                                fontWeight: "bold",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            }}
                                                            >
                                                            {item.ArtDesTv}
                                                            </div> */}
                                                            <div style={{ margin: 5 }}>Precio: ${item.ArtPVenta}.00 x 1 Caja</div>
                                                            <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
                                                                    SKU: {item.ArtSku}
                                                            </div>    
                                                        </CardContent>
                                                        <CardActions
                                                            style={{ display: "flex", alignItems: "center", height: 45, padding:'8px 15px'}}
                                                            >
                                                           <Rating
                                                                name="hover-feedback"
                                                                value={2}
                                                                precision={0.5}
                                                            
                                                            />
                                                            <Media queries={{iphone:{maxWidth:400},small:{maxWidth:1300}}}>
                                                                        {matches=>
                                                                            matches.iphone?(
                                                                                <Link to={'/detalleproducto/'+item.ArtSku}>
                                                                                <Button style={{marginLeft:25}}>Agregar</Button>
                                                                                </Link>
                                                                            )
                                                                            :
                                                                            ( 
                                                                                matches.small?(
                                                                                    <Link to={'/detalleproducto/'+item.ArtSku}>
                                                                                    <Button style={{marginLeft:48}}>Agregar</Button>
                                                                                    </Link>
                                                                                ):(
                                                                                    <Link to={'/detalleproducto/'+item.ArtSku}>
                                                                                    <Button style={{marginLeft:118}}>Agregar</Button>
                                                                                    </Link>
                                                                                )
                                                                            )
                                                                        }
                                                            </Media>
                                                          
                                                        </CardActions>
                                                    </CardActionArea>                               
                                                </Card>
                                            ))
                                        }
                                    </div>
                                    </div>
                                    <Footer></Footer>  
                        
                                    </div>
                                )
                }
                    </Media>
                </>

            </Route>

        )


    }

    componentDidMount() {
        this.CargarProductos().then(item => {
            this.setState({
                productos: item[0]
            }, () => {
                console.log(this.state.productos);
            })
        });
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    Califacion(unit) {
        var califacion = unit
        var html = [];
        for (var i = 1; i < 6; i++) {
            if (i <= califacion) {
                var j = 5 - i;
                html.push(<input type="radio" class="rating-input" id={"rating-input-1-" + j} name="rating-input-1" />);
                html.push(<label for={"rating-input-1-" + j} class={"rating-star1"}></label>);
            }
            else {
                var j = 5 - i;
                html.push(<input type="radio" class="rating-input" id={"rating-input-1-" + j} name="rating-input-1" />);
                html.push(<label for={"rating-input-1-" + j} class={"rating-star"}></label>);
            }
        }
        return html

    }
    CargarProductos() {
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

    resize() {
        const height = window.innerWidth;
        console.log(height);
        if (height < 600) {
            var leftimg
            this.setState({ padding: 58, width: 100, heightimg: 180, leftimg: 38, heightcard: 360, marginright: 60 }, () => { console.log(this.state.height) });
        } else {
            this.setState({ padding: 144, width: 30, heightimg: 135, leftimg: 36, heightcard: 314, marginright: 42 }, () => { console.log(this.state.height) });

        }
    }

}