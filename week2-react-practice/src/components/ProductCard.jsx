import styles from "../styles/ProductCard.module.css";

function ProductCard({ name, price, rating }) {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}

export default ProductCard;