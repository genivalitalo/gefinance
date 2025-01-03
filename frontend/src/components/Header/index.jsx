import React, {useState} from 'react';
import Dropdown from "../Dropdown";
import style from "./style.module.css";
import { LuLayoutGrid, LuList, LuTrendingUp, LuUser, LuChevronDown } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const [dropOpen, setDropOpen] = useState(true);

    const handleDrop = () =>{
        setDropOpen(!dropOpen)
    }
  return (
    <header className={style.containerHeader}>
      <div className={style.containerLeftHeader}>
        <div className={style.containerLogoHeader}>
          <a href="/dashboard" className={style.logo}>
            GeFinance
          </a>
        </div>
        <nav className={style.containerLinksMenu}>
          <ul className={style.linksMenu}>
            <li className={style.linkHeader}>
              <LuLayoutGrid size={20} />
              <a href="/dashboard" className={style.link}>
                Dashboard
              </a>
            </li>
            <li className={style.linkHeader}>
              <LuList size={20} />
              <a href="/transac" className={style.link}>
                Transações
              </a>
            </li>
            <li className={style.linkHeader}>
              <LuTrendingUp size={20} />
              <a href="/investimentos" className={style.link}>
                Investimentos
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.containerRightHeader}>
        <div className={style.cardPerfil} onClick={handleDrop}>
          <LuUser size={20} />
          <p className={style.nomeUser}>Ítalo Silva</p>
          <LuChevronDown  size={20} />
        </div>
        {dropOpen ? "" : <Dropdown />}
        
      </div>
      
    </header>
  );
}
