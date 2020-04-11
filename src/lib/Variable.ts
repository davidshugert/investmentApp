import { VariableInvesmentProperties, VariableType } from "../interfaces/index";
import Invesment from "./Invesment";
import { getCryptoValue, getStockValue } from "./utils/index";
import { format } from "date-fns";

export default class Variable extends Invesment {
  constructor(
    name: string,
    initalTotalPrice: number,
    quantity: number,
    private variableType: VariableType,
    private identifier: string,
    startingDate: Date = new Date()
  ) {
    super(
      "variable",
      name,
      initalTotalPrice / quantity,
      quantity,
      startingDate
    );
  }
  private async getCurrentRate() {
    let currentValue: number;
    if (this.variableType === "crypto") {
      currentValue = await getCryptoValue(this.identifier);
    } else {
      currentValue = await getStockValue(this.identifier);
    }
    this.addFinalValue(currentValue);
  }
  async getProperties(): Promise<VariableInvesmentProperties> {
    !this.finalUnitaryPrice && (await this.getCurrentRate());
    return {
      invesmentType: this.investmentType,
      variableType: this.variableType,
      name: this.name.toUpperCase(),
      initalUnitaryPrice: this.initalUnitaryPrice,
      finalUnitaryPrice: this.finalUnitaryPrice,
      initalPrice: this.initalUnitaryPrice * this.quantity,
      finalPrice: this.finalUnitaryPrice! * this.quantity,
      profit: this.profit,
      quantity: this.quantity,
      startingDate: format(this.startingDate, "MMMM dd yyyy"),
    };
  }
}
