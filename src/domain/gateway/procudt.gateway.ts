// porta de saída para as proximas camadas

import { Product } from "../entity/product";

export interface ProductGateway{

    save(product: Product): Promise<void>; // salvar uma entidade no banco de dados
    list(): Promise<Product[]>; // trazer todos os produtos que estao no banco de dados

}