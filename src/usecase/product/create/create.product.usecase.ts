import { v4 as uuid } from "uuid";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const productInterface = ProductFactory.create(
      input.type,
      input.name,
      input.price,
    );
      const product = new Product(
      productInterface.id,
      productInterface.name,
      productInterface.price );
    

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
