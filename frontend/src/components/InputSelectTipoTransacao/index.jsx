import styles from './styles.module.css'
export default function InputSelectTipoTransacao({name, value, onChange}) {
    return <select name={name} id="" className={styles.inputSelect} value={value} onChange={onChange}>
        <option value="default">Selecione o tipo</option>
        <option value="entrada">Entrada</option>
        <option value="saida">Saída</option>
        <option value="investimento">Investimento</option>
        
    </select>
}