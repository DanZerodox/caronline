import { Component } from 'react';
import React from 'react';
import '../App.css';

export class Footer extends React.Component{
    render(){
        return(
            <>
            <div class="footer">
                <div class="footer-top">
                    <div class="wrap">
                        <p class="leyendapie">Compra tus productos JUMEX favoritos en línea en la Tienda de Jumex oficial en México. Nuevos productos y promociones increíbles: ¡solo lo mejor de Jumex! Jumex cuenta con los mejores productos para ti: prueba los nuevos sabores entre diferentes productos de alta calidad.</p>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="footer-middle">
                <div class="wrap">
                    <div>
                        <ul class="iconos">
                        <li class="logos"><a href="#"><img class="camion" src={require('../images/Jumex/envios.png')}/>
							<p class="text-uppercase">ENVIO A DOMICILIO<br/>
								SIN&nbsp;<span class="bm-icon-ubi-points"></span>REGISTRARTE</p>
						    </a></li>    
                            <li class="logos"><a href="#"><img class="camion" src={require('../images/Jumex/regalo.svg')}/>
							<p class="text-uppercase">VENTAJAS AL COMPRAR<br/>
								EN&nbsp;<span class="bm-icon-ubi-points"></span>LINEA</p>
						    </a></li>
						    <li class="logos"><a href="#"><img class="camion" src={require('../images/Jumex/ayuda.svg')}/>
							<p class="text-uppercase">ASISTENTE VIRTUAL<br/>
								LAS&nbsp;<span class="bm-icon-ubi-points"></span>24 HORAS</p>
						    </a></li>
						    <li class="logos"><a href="#"><img class="camion" src={require('../images/Jumex/tarjeta.svg')}/>
							<p class="text-uppercase">PAGO SEGURO<br/>
								AL&nbsp;<span class="bm-icon-ubi-points"></span>RECIBIR TUS PRODUCTOS</p>
						    </a></li>     
                        </ul>
                    </div>
                </div>
            </div>   
                <div class="footer-bottom">
                <div class="wrap">
                    <div class="section group">
                        <div class="col_1_of_5 span_1_of_5">
                            <h3 class="m_9">CONÓCENOS</h3>
                            <ul class="sub_list">
                            
                                <li><a href="shop.html">Sobre JUMEX</a></li>
                                <li><a href="shop.html">Trabaja con nosotros</a></li>
                            
                            </ul>
                        </div>    
                        <div class="col_1_of_5 span_1_of_5">
					<h3 class="m_9">DESCUBRE MÁS</h3>
					<ul class="list1">
					    <li><a href="shop.html">Productos</a></li>
			            <li><a href="shop.html">Publicidad</a></li>
			            <li><a href="shop.html">Ofertas</a></li>
			         </ul>
				</div>
				<div class="col_1_of_5 span_1_of_5">
					<h3 class="m_9">PERMÍTENOS AYUDARTE</h3>
					<ul class="list1">
					    <li><a href="shop.html">Tu cuenta</a></li>
			            <li><a href="shop.html">Tus órdenes</a></li>
			            <li><a href="shop.html">Política de privacidad</a></li>
			            <li><a href="shop.html">Términos y condiciones</a></li>
			            <li><a href="shop.html">Devoluciones y reemplazos</a></li>
			    
		            </ul>
				</div>
                <div class="col_1_of_5 span_2_of_5">
					<div class="content-asset">
						<a class="footer-faq filter-button" href="https://support.ubi.com/Shop" target="_blank" title="Faq">PERGUNTAS FREQUENTES / AYUDA</a>
						<ul class="footer-social">
							{/* <li class="logos"><a href="https://www.facebook.com/ubisoftstore" data-aa-tracking="1" data-aa-category="Social" data-aa-action="Footer - Facebook" target="_blank" title="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 500 500"><path d="M187.433 500h100.461V248.322h70.26l7.55-83.892h-77.81v-49.078c0-19.924 4.195-27.684 23.28-27.684h54.53V0h-69.63C221.2 0 187.433 33.138 187.433 96.267v67.114H135V250h52.433z" fill="#008aa4"></path></svg></a></li>
							<li class="logos"><a href="https://www.twitter.com/Ubisoftstore" data-aa-tracking="1" data-aa-category="Social" data-aa-action="Footer - Twitter" target="_blank" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 500 500"><path d="M0 405.92a291.87 291.87 0 0 0 448.984-258.74A207.52 207.52 0 0 0 500 94.133a203.252 203.252 0 0 1-58.943 16.057 101.626 101.626 0 0 0 45.122-56.708 200 200 0 0 1-65.04 24.797 102.846 102.846 0 0 0-175 93.7A290.854 290.854 0 0 1 34.755 64.66a102.642 102.642 0 0 0 32.317 136.586A100.203 100.203 0 0 1 19.92 187.83a103.049 103.049 0 0 0 82.317 101.626 101.626 101.626 0 0 1-46.342 1.626 102.846 102.846 0 0 0 95.935 71.342A206.3 206.3 0 0 1 0 405.92z" fill="#008aa4"></path></svg></a></li> */}
							<li class="logos"><a href="https://www.youtube.com/channel/UCBMvc6jvuTxH6TNo9ThpYjg" data-aa-tracking="1" data-aa-category="Social" data-aa-action="Footer - Youtube" target="_blank" title="Youtube"><svg xmlns="http://www.w3.org/2000/svg" width="26px" height="30px" viewBox="0 0 500 500"><path d="M312.49 194.085a41.405 41.405 0 0 0 30.499-18.484v15.711h26.432V50.462H342.99V158.41a26.802 26.802 0 0 1-15.527 10.536c-5.73 0-7.024-3.881-7.024-9.427V50.462h-26.433v118.854c0 14.048 4.252 24.769 18.484 24.769zM194.93 157.116a34.011 34.011 0 0 0 38.632 38.078 36.969 36.969 0 0 0 38.077-38.078v-69.5a36.969 36.969 0 0 0-38.077-38.263 36.969 36.969 0 0 0-38.633 38.263zm27.17-67.282c0-7.764 3.512-13.494 10.906-13.494s11.645 5.545 11.645 13.494v66.173c0 7.764-3.882 13.494-11.09 13.494a12.015 12.015 0 0 1-11.46-13.494zM404.91 224.954H93.637a60.628 60.628 0 0 0-60.629 61.552v152.866A60.628 60.628 0 0 0 93.636 500H404.91a60.628 60.628 0 0 0 60.628-60.628V286.506a60.628 60.628 0 0 0-60.628-61.552zM135.04 453.789h-28.28V296.858H77.37V270.24h87.06v26.618h-29.39zm100.74 0h-25.14v-14.972a55.453 55.453 0 0 1-14.418 12.57c-13.493 7.763-32.162 7.578-32.162-19.779V318.484h25.138v103.697c0 5.36 1.294 9.057 6.655 9.057 5.36 0 11.83-6.284 14.787-10.166V318.484h25.139zm96.857-28.096c0 16.82-6.284 29.76-22.92 29.76a28.65 28.65 0 0 1-23.475-12.015v10.351h-25.878V270.24h25.878v59.15a29.575 29.575 0 0 1 22.366-12.754c18.484 0 24.399 15.711 24.399 34.01zm92.422-36.968h-48.06v25.508c0 10.166 0 18.484 11.091 18.484 11.09 0 11.09-7.024 11.09-18.484v-9.427h25.879v11.09c0 26.063-11.09 41.96-36.969 41.96-25.878 0-36.968-17.56-36.968-41.96v-60.998a36.969 36.969 0 0 1 38.262-39.926c24.03 0 35.675 15.342 35.675 39.926z" fill="#008aa4"></path><path d="M388.83 338.632c-9.427 0-11.276 6.655-11.276 15.897v13.678h22.181v-13.678c0-9.058-2.587-15.897-10.905-15.897zM291.048 339.556a17.375 17.375 0 0 0-5.176 4.067v84.288a18.484 18.484 0 0 0 5.915 4.806 10.72 10.72 0 0 0 12.754-1.294 15.712 15.712 0 0 0 2.218-9.427v-69.87a18.484 18.484 0 0 0-2.033-10.167 10.351 10.351 0 0 0-13.678-2.403zM196.223 0h-30.13L146.87 76.895 126.353 0H96.408l35.49 114.418v78.188h29.76v-78.188z" fill="#008aa4"></path></svg></a></li>
						
						</ul>
						<div class="footer-icon-bar-cards">
						<span class="bm-icon-visa-grey"></span>
						<span class="bm-icon-mastercard-grey"></span>
						<span class="bm-icon-amex-grey"></span>
						<span class="bm-icon-paypal-grey"></span>
						</div>
						</div>
				</div>
                    </div> 
                </div>
                </div>
                <div class="copy">
                    <div class="wrap">
                        <p>© Todos los Derechos Reservados | Template por&nbsp;<a href="http://w3layouts.com/"> JUMEX</a></p>
                    </div>
                </div>
            </div>
            </>
        );
    }
}