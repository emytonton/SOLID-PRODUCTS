import { Prisma, PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/entity/product";
import { ProductGateway } from "../../../domain/gateway/procudt.gateway";


export class ProductRepositoryPrisma implements ProductGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new ProductRepositoryPrisma(prismaClient);
    }

    // converte de entidade para prisma
    public async save(product: Product): Promise<void> {
        const data = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        };

        await this.prismaClient.product.create({
            data,
        });
    }


    //converte de prisma p entidade
    public async list(): Promise<Product[]> {
        const products = await this.prismaClient.product.findMany();

        const productList = products.map((p) => {
            const product = Product.with({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            });

            return product;
        });

        return productList;
    }
}