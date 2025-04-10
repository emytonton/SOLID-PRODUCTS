import { Product } from "../../domain/entity/product";
import { ProductGateway } from "../../domain/gateway/procudt.gateway";
import { Usecase } from "../usecase"

export type CreateProductInputDto = {
    name: string;
    price: number;

}

export type CreateProductOutDto = {
    id: string;
}


// controla o fuxo, ele não sabe como o produto é criado, mas ele manda ser
export class CreateProductUsecase
    implements Usecase<CreateProductInputDto, CreateProductOutDto> {
     

    private constructor(private readonly productGateway: ProductGateway){}


    public static create(ProductGateway: ProductGateway){

        return new CreateProductUsecase(ProductGateway);
    }



    public async execute({
        name,
        price
    }: CreateProductInputDto): Promise<CreateProductOutDto>{
        const aProduct = Product.create(name,price);

        await this.productGateway.save(aProduct);

        const output = this.presentOutput(aProduct);

        return output;



    }


    private presentOutput(product: Product): CreateProductOutDto {
        const output: CreateProductOutDto = {
            id: product.id

        }

        return output;
    }



} 