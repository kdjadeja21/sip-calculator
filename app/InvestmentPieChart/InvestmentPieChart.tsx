import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatIndianRupees } from "../utils/utils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface Data {
  name: string;
  value: number;
}

interface Props {
  data: Data[];
}

const InvestmentPieChart: React.FC<Props> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx={400}
            cy={200}
            innerRadius={80}
            outerRadius={160}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => "₹" + formatIndianRupees(value)}
          />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default InvestmentPieChart;
