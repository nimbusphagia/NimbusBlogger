import styles from "./styles.module.css";

type StatProps = {
  name: string;
  quantity: number;
};

export function Stat({ name, quantity }: StatProps) {
  return (
    <div className={styles.item}>
      <h3>{name}</h3>
      <p>{quantity}</p>
    </div>
  );
}
