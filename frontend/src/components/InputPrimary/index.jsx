import style from './style.module.css';
export default function InputPrimary({ placeholder, type, value, onChange }) {
  return <input type={type} placeholder={placeholder} className={style.input} onChange={onChange} value={value}/>;
}
