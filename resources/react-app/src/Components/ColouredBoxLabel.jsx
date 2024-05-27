import React from 'react';

const ColoredBoxLabel = ({ color, label }) => {
  const boxStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: color,
    display: 'inline-block',
    marginRight: '10px'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 5px'
  };

  const labelStyle = {
    fontSize: '16px',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      <span style={boxStyle}></span>
      <span style={labelStyle}>{label}</span>
    </div>
  );
};

export default ColoredBoxLabel;