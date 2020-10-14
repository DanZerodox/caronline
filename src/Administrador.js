// import * as React from 'react';
// import { Card, CardContent, Typography, Box, CardMedia } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Box from '@material-ui/core/Box';

// function TabPanel(props){
//     const { children, value, index, ...other } = props;

//     return(
//         <div
//             role = "tabpanel"
//             hidden = {value !== index}
//             id = {`vertical-tabpanel-${index}`}
//             aria-labelledby = {`vertical-tab-${index}`}
//             {...other} 
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children : PropTypes.node,
//     index : PropTypes.any.isRequired,
//     value : PropTypes.any.isRequired 
// };

// function allyProps(index){
//     return {
//         id : `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

// // const useStyles = makeStyles((theme)=>{
// //     root: {
// //         flexGrow 1,
// //         backgroundColor
// //     }
// // })

// export class Administrador extends React.Component{
//     render(){
//         return(
//             <div>
//                 <Typography>Bienvenido Daniel Mendoza</Typography>
//             </div>
//         );
//     }

//     componentDidMount(){

//     }
// }