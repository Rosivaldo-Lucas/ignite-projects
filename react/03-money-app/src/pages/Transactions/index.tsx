import { Header } from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transaction() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        
        <TransactionsTable>
          <tbody>
            <tr>
              <td width='50%'>Desenvolvimento de site</td>
              <td>
                <PriceHighLight variant='income'>
                  R$ 12.000,00
                </PriceHighLight>
              </td>
              <td>Venda</td>
              <td>15/06/2024</td>
            </tr>

            <tr>
              <td width='50%'>Desenvolvimento de site</td>
              <td>
                <PriceHighLight variant='outcome'>
                  - R$ 59,88
                </PriceHighLight>
              </td>
              <td>Venda</td>
              <td>15/06/2024</td>
            </tr>

            <tr>
              <td width='50%'>Desenvolvimento de site</td>
              <td>R$ 12.000,00</td>
              <td>Venda</td>
              <td>15/06/2024</td>
            </tr>

            <tr>
              <td width='50%'>Desenvolvimento de site</td>
              <td>R$ 12.000,00</td>
              <td>Venda</td>
              <td>15/06/2024</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
