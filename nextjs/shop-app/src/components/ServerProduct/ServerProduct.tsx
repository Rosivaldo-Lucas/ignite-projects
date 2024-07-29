type Product = {
  id: number;
  nome: string;
  preco: number;
};

export default async function ServerProduct() {
  const response = await fetch('https://api.origamid.online/produtos');
  const products: Product[] = await response.json() as Product[];

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
