'use client';

import { useEffect, useState } from "react";

type Product = {
  id: number;
  nome: string;
  preco: number;
};

export default function ClientProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts () {
      const response = await fetch('https://api.origamid.online/produtos');
      const products: Product[] = await response.json() as Product[];

      setProducts(products);
    }

     fetchProducts();
  }, []);
  
  return (
    <ul>
      {products.map(product => {
        return (
          <li key={product.id}>{`${product.nome} - ${product.preco}`}</li>
        )
      })}
    </ul>
  );
}
