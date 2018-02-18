import { Decimal } from 'decimal.js-light';

export default function calculateResults(debts, monthlyContribution, strategy) {
  let graphData = [];

  for (let i = 0; i <= 10; i++) {
    const projectedPrinciples = debts.reduce((accum, debt) => {
      accum[debt.id] = Math.max(
        (totalWithInterest(debt, i) - monthlyContribution / 100 * i).toFixed(2),
        0
      );
      return accum;
    }, {});

    const dataPoint = Object.assign(projectedPrinciples, {
      label: `Month ${i}`
    });

    graphData.push(dataPoint);
  }

  return { graphData };
}

function totalWithInterest(debt, months = 0) {
  const rate = new Decimal(debt.rate);

  let totalRate = new Decimal(
    rate
      .div(1200)
      .add(1)
      .pow(months)
  );
  return new Decimal(debt.principle).div(100).mul(totalRate);
}
