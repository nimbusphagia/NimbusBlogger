import styles from "./styles.module.css";

type StatProps = {
  name: string;
  quantity: number;
  customClass?: string
};

export function Stat({ name, quantity, customClass }: StatProps) {
  return (
    <div className={`${styles.item} ${customClass ? customClass : ''}`}>
      <h3>{name}</h3>
      <p>{quantity}</p>
    </div>
  );
}
