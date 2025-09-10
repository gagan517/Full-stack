import React from "react";
import ProductCard from "./product_card";

function App() {
  return (
    <div style={styles.app}>
      <h2>Products List</h2>
      <div style={styles.container}>
        <ProductCard name="Wireless Mouse" price={25.99} status="In Stock" />
        <ProductCard name="Keyboard" price={45.5} status="Out of Stock" />
        <ProductCard name="Monitor" price={199.99} status="In Stock" />
      </div>
    </div>
  );
}

const styles = {
  app: {
    textAlign: "center",
    padding: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
};

export default App;
