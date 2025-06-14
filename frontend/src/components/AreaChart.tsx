

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type Product = {
  name: string;
  price: number;
  stocks: number;
};

export const description = "A stacked area chart showing price and stock";

const chartConfig = {
  price: {
    label: "Price",
    color: "#2563eb",
  },
  stocks: {
    label: "Stock",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartAreaStacked() {
  const { products } = useSelector((state: RootState) => state.product);

  const chartData =
    products?.map((product: Product) => ({
      name:
        product.name.length > 10 ? product.name.slice(0, 10) + "…" : product.name,
      price: product.price,
      stocks: product.stocks,
    })) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Price & Stock</CardTitle>
        <CardDescription>Visualizing product data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="price"
              fill="#2563eb"
              fillOpacity={0.4}
              stroke="#2563eb"
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="stocks"
              fill="#60a5fa"
              fillOpacity={0.4}
              stroke="#60a5fa"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing product price & stock trends
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
