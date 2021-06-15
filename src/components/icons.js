import React from "react";
import PropTypes from "prop-types";

const iconPath = {
   close: "M75.995,11.769 L47.721,40.043 L75.945,68.267 L68.167,76.045 L39.943,47.821 L11.751,76.014 L3.993,68.256 L32.185,40.063 L3.755,11.633 L11.533,3.855 L39.963,32.285 L68.237,4.011 L75.995,11.769 Z",
};

const defaultStyles = { 
   display: "inline-block", 
   verticalAlign: "middle" 
};

const Icons = ({ size, color, icon, className, style, viewBox }) =>  {
   const styles = { ...defaultStyles, ...style };

   return (
      <svg className={className} style={styles} viewBox={viewBox} width={`${size}px`} height={`${size}px`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
         <path fill={color} d={iconPath[icon]} />
      </svg>
   );
};

Icons.defaultProps = {
   size: 16,
   color: "#000000", 
   viewBox: "0 0 79 79",
   style: {},
   className: "",
};

Icons.propTypes = {
   size: PropTypes.number.isRequired,
   color: PropTypes.string.isRequired,
   icon: PropTypes.string.isRequired,
   viewBox: PropTypes.string.isRequired,
   style: PropTypes.shape(PropTypes.object),
   className: PropTypes.string,
 };

 export default Icons;
