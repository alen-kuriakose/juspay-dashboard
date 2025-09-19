"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgba(168, 197, 218, 1)",
  },
  mobile: {
    label: "Mobile",
    color: "rgba(168, 197, 218, 0.5)",
  },
} satisfies ChartConfig;
/* The `StackedBarChart` function is a React component that renders a stacked bar chart using the
Recharts library. Here's a breakdown of what the code is doing: */

export function StackedBarChart() {
  return (
    <Card className="border-0 bg-primary-light dark:bg-white/15 shadow-none">
      {" "}
      {/* Adjust overall card height */}
      <CardHeader className="pb-4">
        <CardTitle className="font-inter font-semibold text-sm">Projections vs Actuals</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} barSize={20}>
            <CartesianGrid vertical={false}  />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={7}
              axisLine={{ stroke: 'rgba(28, 28, 28, .1)' }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={2} axisLine={false} width={30}/>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
