import { useRef, useState, useEffect } from "react";
import styles from "./style.module.css"; // Nome do objeto ajustado
import api from "../../services/api";
import Header from "../../components/Header";
import ButtonPrimary from "../../components/ButtonPrimary";

export default function Transac() {
  return (
    <div className={styles.container}>
      <Header />
      <h1>Transac</h1>
    </div>
  );
}
