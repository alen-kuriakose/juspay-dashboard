"use client";

import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { source: "Direct", amount: 300.56, fill: "hsl(240, 60%, 70%)" },
  { source: "Affiliate", amount: 135.18, fill: "hsl(120, 40%, 80%)" },
  { source: "Sponsored", amount: 154.02, fill: "hsl(260, 60%, 70%)" },
  { source: "E-mail", amount: 48.96, fill: "hsl(190, 70%, 80%)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
/**
 * The function `PieChartComponent` returns a React component that displays a pie chart with donut
 * style and accompanying text information.
 * @returns The `PieChartComponent` function is returning a JSX structure that represents a pie chart
 * component with a donut shape and text labels. The component includes a card layout with a title, the
 * pie chart itself, and a list of data items with corresponding amounts displayed below the chart.
 */

export function PieChartComponent() {

  return (
    <Card className="flex flex-col border-0 bg-primary-light dark:bg-white/15 shadow-none gap-4 !h-full ">
      <CardHeader className=" font-inter font-semibold text-sm">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0!h-full">
        <ChartContainer config={chartConfig} className="mx-auto  !h-fulll">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
              cornerRadius={40}
            ></Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm w-full">
        <ul className=" text-sm w-full flex flex-col gap-3">
          {chartData.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between w-full text-dark dark:text-white/40"
            >
              <div className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.fill }}
                ></span>
                <span className="text-dark dark:text-white">{item.source}</span>
              </div>
              <span className="text-dark dark:text-white font-medium">
                ${item.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
