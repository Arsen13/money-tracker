"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

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
import { axiosInstance } from "@/lib/axiosInstance"

type ChartData = { name: "Income" | "Expense"; value: number };

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--customBlue)",
  },
  expense: {
    label: "Expense",
    color: "var(--customPurple)",
  }
} satisfies ChartConfig

export default function TotalTransaction({}) {

  const [chartData, setChartData] = React.useState<ChartData[]>([])

  React.useEffect(() => {
    async function getTotalCountOfTransaction() {
      const res = await axiosInstance.get('transactions/total');
      setChartData(res.data);
    }

    getTotalCountOfTransaction()
  }, [])

  const totalTransactions = React.useMemo(() => {
    return chartData?.reduce((sum, item) => sum + item.value, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col gap-0 bg-widget border-none h-48 w-60">
      <CardHeader className="items-center pb-0 mt-[-12]">
        <CardDescription className="text-center text-md text-white">Total transactions</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalTransactions > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={60}
                strokeWidth={5}
                cx="38%"
                cy="25%"
              >
                {chartData.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`}
                        fill={chartConfig[entry.name.toLowerCase() as "income" | 'expense']?.color || "#ffffff"}
                    />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTransactions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Transactions
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="mt-10 text-center">
            <p className="text-4xl text-white font-bold">0</p>
            <p className="text-xs text-muted-foreground">Transactions</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
