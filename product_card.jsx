import React from "react";

function ProductCard({ name, price, status }) {
  return (
    <div style={styles.card}>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
};

export default ProductCard;
