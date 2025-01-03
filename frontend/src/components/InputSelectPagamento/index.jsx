import styles from './styles.module.css'
export default function InputSelectPagamento({name, value, onChange}) {
    return <select name={name} id="" className={styles.inputSelect} value={value} onChange={onChange}>
        <option value="default">Selecione o método</option>
        <option value="boleto">Boleto</option>
        <option value="cartao-de-credito">Cartão de Crédito</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">Pix</option>
        <option value="transferencia">Transferência</option>
    </select>
}