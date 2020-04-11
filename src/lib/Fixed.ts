import Invesment from "./Invesment";
import { FixedInvesmentProperties } from "../interfaces/index";
import { format } from "date-fns";

export default class Fixed extends Invesment {
  constructor(
    name: string,
    initialValue: number,
    finalValue: number,
    startingDate: Date,
    private endingDate: Date
  ) {
    super("fixed", name, initialValue, 1, startingDate);
    this.addFinalValue(finalValue);
  }
  async getProperties(): Promise<FixedInvesmentProperties> {
    return {
      invesmentType: this.investmentType,
      name: this.name,
      initalUnitaryPrice: this.initalUnitaryPrice,
      finalUnitaryPrice: this.finalUnitaryPrice,
      initalPrice: this.initalUnitaryPrice * this.quantity,
      finalPrice: this.finalUnitaryPrice! * this.quantity,
      profit: this.profit,
      startingDate: format(this.startingDate, "MMMM dd yyyy"),
      endingDate: format(this.endingDate, "MMMM dd yyyy"),
      quantity: 1,
    };
  }
}
