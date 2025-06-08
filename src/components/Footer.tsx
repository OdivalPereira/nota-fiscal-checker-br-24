import React from "react";

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-4">
    <div className="container mx-auto px-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Sistema Integrado • Todos os direitos reservados
    </div>
  </footer>
);

export default Footer;
