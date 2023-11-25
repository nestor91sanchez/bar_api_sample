import React from "react";

const Footer = () => {
  return (
    <footer className="p-3 flex justify-center items-center gap-1 sm:flex-row bg-white border-t-2 border-slate-200">
      <span>Nestor Sanchez </span>
      <a
        href="#"
        className="ml-1 font-semibold"
        target="_blank"
        rel="noreferrer"
      >
        {"<Code/>"}
      </a>
    </footer>
  );
};

export default Footer;
