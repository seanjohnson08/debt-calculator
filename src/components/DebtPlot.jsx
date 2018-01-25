import React, { Component } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

function totalWithInterest(debt, months = 0) {
  return debt.principle / 100 * debt.rate ** months;
}

class DebtPlot extends Component {
  constructor(props) {
    super();
  }
  calculateProjections() {
    const { monthlyContribution } = this.props;
    this.data = [];
    for (let i = 0; i <= 10; i++) {
      const projectedPrinciples = this.props.debts.reduce((accum, debt) => {
        accum[debt.id] = Math.max(
          (totalWithInterest(debt, i) - monthlyContribution / 100 * i).toFixed(
            2
          ),
          0
        );
        return accum;
      }, {});

      const dataPoint = Object.assign(projectedPrinciples, {
        label: `Month ${i}`
      });

      this.data.push(dataPoint);
    }
  }

  render() {
    this.calculateProjections();

    const fillColors = ['#8884d8', '#82ca9d', '#ffc658'];
    const strokeColors = ['#8884d8', '#82ca9d', '#ffc658'];
    const areas = this.props.debts.map((debt, i) => {
      return (
        <Area
          type="monotone"
          key={debt.id}
          dataKey={debt.id}
          name={debt.description}
          stackId="1"
          stroke={strokeColors[i]}
          fill={fillColors[i]}
        />
      );
    });
    return (
      <AreaChart
        width={this.props.width}
        height={this.props.height}
        data={this.data}
        className={this.props.className}
      >
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        {areas}
      </AreaChart>
    );
  }
}

export default DebtPlot;
