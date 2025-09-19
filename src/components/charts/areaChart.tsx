"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TextSmallSemibold } from "../typography";
export const description = "A multiple line chart";
/* The `chartData` constant is defining an array of objects where each object represents data for a
specific month. Each object has properties for the month name, desktop revenue, and mobile revenue.
This data structure is likely used to populate the line chart in the React component
`AreaChartComponent` to display revenue trends over the specified months for both desktop and mobile
platforms. */
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
/* The `const chartConfig` declaration is defining an object that satisfies the `ChartConfig`
interface. This interface likely specifies the structure that a chart configuration object should
adhere to within the context of the application. */
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

/* The `AreaChartComponent` function is defining a React component that renders a card containing a
line chart.  */
export function AreaChartComponent() {
  return (
    <Card className="border-0 bg-primary-light dark:bg-white/15 shadow-none flex flex-col gap-0 !h-full">
      <CardHeader className="pb-4">
        <CardTitle>
          <div className="flex w-full gap-4 items-center ">
            <TextSmallSemibold>Revenue</TextSmallSemibold>
            <Separator  
              orientation="vertical"
              className="dark:border-white h-3"
            />

            <ul className="flex text-xs font-inter font-normal list-disc gap-4 list-inside">
              <li className="marker:text-dark marker:dark:text-[#C6C7F8]">
                Current Week $58,211
              </li>
              <li className="marker:text-[#A8C5DA] marker:dark:text-[#A8C5DA]">
                Previous Week $68,768
              </li>
            </ul>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="!h-[300px]">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={2} axisLine={false} width={30}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
