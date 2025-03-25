"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { "period": "December", "income": 3300, "expense": 2341 },
    { "period": "January", "income": 4679, "expense": 2250 },
    { "period": "February", "income": 1300, "expense": 2600 },
    { "period": "March", "income": 850, "expense": 510 },
    { "period": "April", "income": 5341, "expense": 6230 }
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--customBlue)",
  },
  expense: {
    label: "Expense",
    color: "var(--customPurple)",
  },
} satisfies ChartConfig

export function GraphByPeriod() {
  return (
    <Card className="w-[945px] bg-widget gap-0 border-none h-96">
      <CardHeader>
        <CardDescription className="text-center text-lg text-white">
          Showing total transaction amount for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot"  className="text-white"/>}
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--customPurple)"
              fillOpacity={0.4}
              stroke="var(--customPurple)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--customBlue)"
              fillOpacity={0.4}
              stroke="var(--customBlue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}