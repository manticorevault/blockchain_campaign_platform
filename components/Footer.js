import React from 'react';

const footerStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: '#9dc6d8 ',
  color: 'darkblue ',
  textAlign: 'center',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        <a href="https://github.com/manticorevault">Github </a>
        | <a href="https://therustyco.de/">Blog | </a>
        <a href="https://www.linkedin.com/in/artur-serra/">Linkedin </a>
        | <a href="#">Portfolio </a>
        | 2023
      </p>
    </footer>
  );
};

export default Footer;