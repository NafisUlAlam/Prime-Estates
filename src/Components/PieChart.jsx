import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Group A", value: 400 },
  { label: "Group B", value: 300 },
  { label: "Group C", value: 300 },
  { label: "Group D", value: 200 },
  { label: "Group E", value: 278 },
  { label: "Group F", value: 189 },
];

export default function StraightAnglePieChart({ data }) {
  console.log(data);
  const myData = [...data];
  return (
    <PieChart
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          myData,
        },
      ]}
      height={300}
    />
  );
}
