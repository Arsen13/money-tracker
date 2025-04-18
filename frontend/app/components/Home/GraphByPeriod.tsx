'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axiosInstance';
import GraphByPeriodSkeleton from '../skeletons/GraphByPeriodSkeleton';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--customBlue)',
  },
  expense: {
    label: 'Expense',
    color: 'var(--customPurple)',
  },
} satisfies ChartConfig;

type chartDataT = {
  period: string;
  income: number;
  expense: number;
};

export function GraphByPeriod() {
  const [chartData, setChartData] = useState<chartDataT[]>([]);

  useEffect(() => {
    async function getGraphicData() {
      const res = await axiosInstance.get('transactions/groupBy');
      setChartData(res.data);
    }

    getGraphicData();
  }, []);

  console.log(chartData);

  return (
    <Card className='bg-widget h-96 w-[945px] gap-0 border-none'>
      <CardHeader>
        <CardDescription className='text-center text-lg text-white'>
          Showing total transaction amount for the last months
        </CardDescription>
      </CardHeader>
      {chartData.length == 0 ? (
        <GraphByPeriodSkeleton />
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig} className='h-80 w-full'>
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
                dataKey='period'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent indicator='dot' className='text-white' />
                }
              />
              <Area
                dataKey='expense'
                type='natural'
                fill='var(--customPurple)'
                fillOpacity={0.4}
                stroke='var(--customPurple)'
                stackId='a'
              />
              <Area
                dataKey='income'
                type='natural'
                fill='var(--customBlue)'
                fillOpacity={0.4}
                stroke='var(--customBlue)'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
}
