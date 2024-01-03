import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate() {
    ProductValidatorFactory.create().validate(this)
    // if (this._id.length === 0) {
    //   //throw new Error("Id is required");
    //   this.notification.addError({
    //     message: "Id is required",
    //     context: "product",
    //   });
    // }
    // if (this._name.length === 0) {
    //    //throw new Error("Name is required");
    //     this.notification.addError({
    //       message: "Name is required",
    //       context: "product",
    //     });
    // }
    // if (this._price < 0) {
    //    //throw new Error("Price must be greater than zero");
    //    this.notification.addError({
    //      message: "Price must be greater than zero",
    //      context: "product",
    //    });
    // }
    // return true;
  }
}
