// import react module
import React from 'react';


/* *
 * Create a map context so that multiple components can share the same map instance and perform updates/modification to the same map properties
 * 
 * @author Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
const MapContext = React.createContext();
export default MapContext;