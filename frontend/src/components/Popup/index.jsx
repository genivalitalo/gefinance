// import ButtonCancelOut from "../ButtonCancelOut";
// import ButtonPrimary from "../ButtonPrimary";
// import InputPrimary from "../InputPrimary";
// import InputSelectPagamento from "../InputSelectPagamento";
// import InputSelectTipoTransacao from "../InputSelectTipoTransacao";
// import InputSelect from "../InputSelectTipoTransacao";
// import styles from "./styles.module.css";

// export default function Popup({ref}) {
//   return (
//     <div ref={ref} className={styles.containerPopup}>
//       <div className={styles.containerHeaderPopup}>
//         <h3 className={styles.nomePopup}>Adicionar Transação</h3>
//         <p className={styles.descricaoPopup}>Insira as informações abaixo</p>
//       </div>
//       <div className={styles.containerBodyPopup}>
//         <div className={styles.cardInput}>
//           <label htmlFor="nome_transacao" className={styles.label}>
//             Título
//           </label>
//           <InputPrimary placeholder={"Título"} type={"text"} />
//         </div>
//         <div className={styles.cardInput}>
//           <label htmlFor="nome_transacao" className={styles.label}>
//             Valor
//           </label>
//           <InputPrimary placeholder={"R$ 0.000,00"} type={"text"} />
//         </div>
//         <div className={styles.cardInput}>
//           <label htmlFor="nome_transacao" className={styles.label}>
//             Tipo de Transação
//           </label>
//           <InputSelectTipoTransacao />
//         </div>
//         <div className={styles.cardInput}>
//           <label htmlFor="nome_transacao" className={styles.label}>
//             Método de pagamento
//           </label>
//           <InputSelectPagamento name={'input-metodo-transacao'} placeholder={'Selecione'}/>
//         </div>
//         <div className={styles.cardInput}>
//           <label htmlFor="nome_transacao" className={styles.label}>
//             Data
//           </label>
//           <InputPrimary placeholder={"Selecione a data"} type={"date"} />
//         </div>
//       </div>
//       <div className={styles.containerFooterPopup}>
//         <ButtonCancelOut nome={'Cancelar'}/>
//         <ButtonPrimary nome={"Adicionar"} />
//       </div>
//     </div>
//   );
// }
