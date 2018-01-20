import React, { Component } from 'react';
import {
  Area, AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis, YAxis,
} from 'recharts';

class DebtPlot extends Component {
  calculateProjections() {
    this.data = [];
    for (let i = 0; i <= 10; i++) {
      const projectedPrinciples = this.props.debts.reduce((accum, debt) => {
        accum[debt.id] = Math.round(debt.principle / 100 * (1 - .1 * i));
        return accum;
      }, {});

      const dataPoint = Object.assign(projectedPrinciples, {
        label: `Month ${i}`,
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
        <Area type="monotone" dataKey={debt.id} name={debt.description} stackId="1" stroke={strokeColors[i]} fill={fillColors[i]}/>
      );
    });
    debugger;
    return (
      <AreaChart width={this.props.width} height={this.props.height} data={this.data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3"/>
        {areas}
      </AreaChart>
    );
  }
}

export default DebtPlot;