import style from './style.module.css';
export default function ButtonPrimary({ nome, type, onClick}) {
  return <button type={type} className={style.button} onClick={onClick}>{nome}</button>
}
