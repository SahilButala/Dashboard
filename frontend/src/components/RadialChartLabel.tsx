"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type Product = {
  name: string;
  stocks: number;
};

export const description = "A radial chart showing product stocks";

const colors = [
  "#2563eb", // blue
  "#60a5fa", // light blue
  "#facc15", // yellow
  "#34d399", // green
  "#f87171", // red
  "#a78bfa", // purple
];

export function ChartRadialLabel() {
  const { products } = useSelector((state: RootState) => state.product);

  const chartData =
    products?.map((product: Product, index: number) => ({
      browser:
        product.name.length > 10
          ? product.name.slice(0, 10) + "…"
          : product.name,
      visitors: product.stocks,
      fill: colors[index % colors.length],
    })) || [];

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Stock",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Product Stocks</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel nameKey="browser" />
              }
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total product stocks
        </div>
      </CardFooter>
    </Card>
  );
}
    