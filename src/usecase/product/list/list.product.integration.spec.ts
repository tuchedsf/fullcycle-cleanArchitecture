import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";


describe("Test List product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should List a product", async () => {
    const productRepository = new ProductRepository();
    const usecaseCreate = new CreateProductUseCase(productRepository);

    const product = { "type":"a","name": "Diego", "price": 12};

    const result = await usecaseCreate.execute(product);
    
    const output = {
       id: "",
       name: "Diego",
       price: 12,
    };

    const usecaseList = new ListProductUseCase(productRepository);
    const resultList = await usecaseList.execute({});
    expect(resultList.products.length).toBe(1);
    expect(resultList.products[0].name).toBe(output.name);
    expect(resultList.products[0].price).toBe(output.price);
    
  });
});
