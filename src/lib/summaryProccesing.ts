import { InvTypes, VariableInvesmentProperties, SummaryData } from "./../interfaces/index";

const getPerc = (val: number, base: number): number =>
  +((val / base) * 100).toFixed(2);

export default (tableValues: InvTypes[]) => {
  const summPre = tableValues.reduce(
    (acc, invesment) => {
      acc.initial += invesment.initalPrice;
      acc.current += invesment.finalPrice!;
      acc.profit += invesment.profit!;
      acc.initialPrices[invesment.invesmentType] += invesment.initalPrice;
      acc.finalPrices[invesment.invesmentType] += invesment.finalPrice!;
      if (invesment.invesmentType === "variable") {
        acc.initialPrices[
          (invesment as VariableInvesmentProperties).variableType
        ] += invesment.initalPrice;
        acc.finalPrices[
          (invesment as VariableInvesmentProperties).variableType
        ] += invesment.finalPrice!;
      }

      return acc;
    },
    {
      initial: 0,
      current: 0,
      profit: 0,
      initialPrices: {
        fixed: 0,
        variable: 0,
        crypto: 0,
        stock: 0
      },
      finalPrices: {
        fixed: 0,
        variable: 0,
        crypto: 0,
        stock: 0
      }
    }
  );

  const summary: SummaryData = {
    ...summPre,
    percentage: {
      percentage: +((1 - summPre.initial / summPre.current) * 100).toFixed(2),
      initial: {
        fixed: getPerc(summPre.initialPrices.fixed, summPre.initial),
        variable: getPerc(summPre.initialPrices.variable, summPre.initial),
        crypto: getPerc(
          summPre.initialPrices.crypto,
          summPre.initialPrices.variable
        ),
        stock: getPerc(
          summPre.initialPrices.stock,
          summPre.initialPrices.variable
        )
      },
      final: {
        fixed: getPerc(summPre.finalPrices.fixed, summPre.current),
        variable: getPerc(summPre.finalPrices.variable, summPre.current),
        crypto: getPerc(
          summPre.finalPrices.crypto,
          summPre.finalPrices.variable
        ),
        stock: getPerc(summPre.finalPrices.stock, summPre.finalPrices.variable)
      }
    }
  };

  return summary;
};
