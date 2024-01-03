import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";


describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecaseCreate = new CreateProductUseCase(productRepository);

    const product = { "type":"a","name": "Diego", "price": 12};

    const create = {
      id: "",
      name: "Diego",
      price: 12
    };

    const resultCreate = await usecaseCreate.execute(product);
    create.id = resultCreate.id;

  const usecaseUpdate = new UpdateProductUseCase(productRepository);

  resultCreate.name = "Nome Atualizado";
  const result = await usecaseUpdate.execute(resultCreate);

  const output = {
    id: resultCreate.id,
    name: "Nome Atualizado",
    price: 12,
  };

    expect(result).toEqual(output);
  });
});
