"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

export const description = "A donut chart showing product stock distribution";

const colors = [
  "#2563eb", // Blue
  "#60a5fa", // Light blue
  "#facc15", // Yellow
  "#34d399", // Green
  "#f87171", // Red
  "#a78bfa", // Purple
];

export function ChartPieDonutText() {
  const { products } = useSelector((state: RootState) => state.product);

  const chartData =
    products?.map((product: Product, index: number) => ({
      name:
        product.name.length > 10
          ? product.name.slice(0, 10) + "…"
          : product.name,
      visitors: product.stocks,
      fill: colors[index % colors.length],
    })) || [];

  const totalStock = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const chartConfig: ChartConfig = {
    visitors: {
      label: "Stock",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Product Stocks</CardTitle>
        <CardDescription>Distribution of inventory</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          {totalStock.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Stock
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing stock distribution of products
        </div>
      </CardFooter>
    </Card>
  );
}
