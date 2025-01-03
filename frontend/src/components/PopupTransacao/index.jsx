import styles from './styles.module.css';

import React, { useState, useRef, useEffect } from "react";

const PopupTransacao = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a visibilidade do popup
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen); // Alterna entre abrir/fechar o popup
  };

  const handleClickOutside = (event) => {
    // Verifica se o clique foi fora do popup
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false); // Fecha o popup
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button onClick={togglePopup}>Abrir Popup</button>
      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p>Este é o conteúdo do popup.</p>
          <button onClick={togglePopup}>Fechar</button>
        </div>
      )}
    </div>
  );
};

export default PopupTransacao;

