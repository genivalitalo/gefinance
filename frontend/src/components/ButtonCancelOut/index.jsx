import style from './style.module.css';
export default function ButtonCancelOut({ nome, type, onClick}) {
  return <button type={type} className={style.button} onClick={onClick}>{nome}</button>
}
