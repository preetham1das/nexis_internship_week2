import ProductCard from "../components/ProductCard";

function Products() {
  const products = [
    {
      id: 1,
      name: "Samsung Galaxy",
      price: 2599,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Sony Headphones",
      price: 5999,
      rating: 4.3,
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 3499,
      rating: 4.6,
    },
  ];

  return (
    <div className="page-card">
      <div className="section-heading">
        <span className="eyebrow">Featured picks</span>
        <h1>Products</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;