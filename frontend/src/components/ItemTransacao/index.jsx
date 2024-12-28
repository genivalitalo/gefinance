import styles from "./styles.module.css";

export default function ItemTransacao({
  nomeTransacao,
  dataTransacao,
  icon: Icon,
  valorTransacao,
}) {
  return (
    <div className={styles.listItemTransacoes}>
      <div className={styles.containerItemLeftTransacoes}>
        <div className={styles.iconMetodoTransacao}>{Icon && <Icon />}</div>
        <div className={styles.infoTransacoes}>
          <p className={styles.nomeTransacao}>{nomeTransacao}</p>
          <span className={styles.dataTransacao}>{dataTransacao}</span>
        </div>
      </div>
      <div className={styles.containerItemRightTransacoes}>
        <p className={styles.valueTransacao}>R$ {valorTransacao}</p>
      </div>
    </div>
  );
}