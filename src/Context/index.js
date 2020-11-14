// import react module
import React from 'react';

/**
 * Create a map context so that multiple components can share the same map instance and perform updates/modification to the same map properties
 */
const MapContext = React.createContext();
export default MapContext;