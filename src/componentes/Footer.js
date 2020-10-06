import { CardContent } from '@material-ui/core';
import React from 'react';
import Card from 'react-bootstrap/Card';
import CardMedia from "@material-ui/core/CardMedia";
import Media from 'react-media';
const useStyles={
	height: '50%',
	width: '100%',
	backgroundSize:'contain', 
	backgroundRepeat:'no-repeat', 
	backgroundPosition:'center'
};
export class Footer extends React.Component{
    render(){
        return(
            <>
			<Media queries={{small: {maxWidth:480}}}>
					{matches=>
						matches.small?(
							<Card style={{boxShadow:'none', padding:'10px 25px', border:'none', backgroundColor:'#ffffff'}}>
								<Card.Title>
								<p style={{fontSize:10}}>Compra tus productos JUMEX favoritos en línea en la Tienda de Jumex oficial en México. Nuevos productos y promociones increíbles: ¡solo lo mejor de Jumex! Jumex cuenta con los mejores productos para ti: prueba los nuevos sabores entre diferentes productos de alta calidad.</p>
								</Card.Title>
								<div style={{display:'flex', justifyContent:'space-between'}}>
									<CardMedia style={{height:60, width:97}} image={require('../images/Jumex/envios.png')}></CardMedia>
									<CardMedia style={{height:50, width:50}} image={require('../images/Jumex/regalo.svg')}></CardMedia>
									<CardMedia style={{height:50, width:50}} image={require('../images/Jumex/ayuda.svg')}></CardMedia>
									<CardMedia style={{height:60, width:97}} image={require('../images/Jumex/tarjeta.svg')}></CardMedia>
								</div>
						    </Card>
						):(
							<Card style={{boxShadow:'none', padding:'10px 90px', border:'none', backgroundColor:'#ffffff'}}>
								<Card.Title>
								<p style={{fontSize:10}}>Compra tus productos JUMEX favoritos en línea en la Tienda de Jumex oficial en México. Nuevos productos y promociones increíbles: ¡solo lo mejor de Jumex! Jumex cuenta con los mejores productos para ti: prueba los nuevos sabores entre diferentes productos de alta calidad.</p>
								</Card.Title>
								<div style={{display:'flex', justifyContent:'space-between', height:150}}>
									<CardContent style={{textAlign:'center', lineHeight:10}}><CardMedia style={useStyles} image={require('../images/Jumex/envios.png')}></CardMedia><p>ENVIO A DOMICLIO</p></CardContent>
									<CardContent style={{textAlign:'center', lineHeight:40}}><CardMedia style={useStyles} image={require('../images/Jumex/regalo.svg')}></CardMedia><p>VENTAJAS AL COMPRAR</p><p style={{lineHeight:0}}>EN LINEA</p></CardContent>
									<CardContent style={{textAlign:'center', lineHeight:40}}><CardMedia style={useStyles} image={require('../images/Jumex/ayuda.svg')}></CardMedia><p>ASISTENTE VIRTUAL</p><p style={{lineHeight:0}}>LAS 24 HORAS</p></CardContent>
									<CardContent style={{textAlign:'center'}}><CardMedia style={useStyles} image={require('../images/Jumex/tarjeta.svg')}></CardMedia><p>PAGO SEGURO</p></CardContent>
								</div>
						    </Card>
						)
					
					}
				</Media>
			 
        
            </>
        );
    }
}