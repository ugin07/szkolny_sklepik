import React from "react";

const Footer = ({ theme }) => {
  return (
    <footer
      className={`text-center py-3 mt-auto ${
        theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
      }`}
    >
      <div className="container">
        <p className="m-0">
          © 2025 Szkolny Sklepik. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
};

export default Footer;