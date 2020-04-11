import { InvTypes } from "./../interfaces/index";
import { InvesmentType, ProcessedPrice } from "../interfaces/index";

export default abstract class Invesment {
  protected finalUnitaryPrice: ProcessedPrice = null;
  protected profit: ProcessedPrice = 0;
  constructor(
    protected investmentType: InvesmentType,
    public name: string,
    protected initalUnitaryPrice: number,
    protected quantity: number,
    protected startingDate: Date = new Date()
  ) {}
  addFinalValue(value: number) {
    this.finalUnitaryPrice = value;
    this.profit =
      (this.finalUnitaryPrice - this.initalUnitaryPrice) * this.quantity;
  }
  abstract getProperties(this: Invesment): Promise<InvTypes>;
}
