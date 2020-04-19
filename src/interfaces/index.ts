export type InvesmentType = "fixed" | "variable";
export type VariableType = "crypto" | "stock";
export type ProcessedPrice = number | null;
export type InvTypes = VariableInvesmentProperties | FixedInvesmentProperties;

export interface InvestmentInital {
  invesmentType: InvesmentType;
  variableType: VariableType;
  name: string;
  quantity: number;
  initalPrice: number;
  finalPrice: number;
  startingDate: string;
  endingDate: string;
}

export interface InvesmentInterface {
  invesmentType: InvesmentType;
  name: string;
  initalUnitaryPrice: number;
  finalUnitaryPrice: number | null;
  initalPrice: number;
  finalPrice: number | null;
  profit: number | null;
  quantity: number;
  startingDate: string | null;
}

export interface FixedInvesmentProperties extends InvesmentInterface {
  endingDate: string | null;
}
export interface VariableInvesmentProperties extends InvesmentInterface {
  variableType: VariableType;
}

interface summaryNumberTypes {
  fixed: number;
  variable: number;
  crypto: number;
  stock: number;
}
export interface SummaryData {
  initial: number;
  current: number;
  profit: number;
  initialPrices: summaryNumberTypes;
  finalPrices: summaryNumberTypes;
  percentage: {
    percentage: number;
    initial: summaryNumberTypes;
    final: summaryNumberTypes;
  };
}
