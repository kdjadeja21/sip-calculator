import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Data {
  id: number;
  year: number;
  invested_amount: string;
  total_amount: string;
}

interface Props {
  data: Data[];
}

const InvestmentChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 50,
          bottom: 51,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{ value: "Year", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat("en-IN").format(value)
          }
        />
        <Tooltip
          formatter={(value: string) =>
            `₹${new Intl.NumberFormat("en-IN").format(parseFloat(value))}`
          }
        />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="monotone"
          dataKey="invested_amount"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
          name="Invested Amount"
        />
        <Area
          type="monotone"
          dataKey="total_amount"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
          name="Total Amount"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InvestmentChart;
