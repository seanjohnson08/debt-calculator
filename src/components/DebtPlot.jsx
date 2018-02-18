import React, { Component } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

class DebtPlot extends Component {
  constructor(props) {
    super();
  }

  render() {
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
        data={this.props.graphData}
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
