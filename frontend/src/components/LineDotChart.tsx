

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

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

// Product type
type Product = {
  name: string;
  price: number;
  stocks: number;
};

export const description = "Line chart for product price and stock";

const chartConfig = {
  price: {
    label: "Price",
    color: "#2563eb", // blue
  },
  stocks: {
    label: "Stock",
    color: "#60a5fa", // light blue
  },
} satisfies ChartConfig;

export function ChartLineDots() {
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
        <CardTitle>Line Chart - Price & Stock</CardTitle>
        <CardDescription>Based on current product data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="stocks"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ fill: "#60a5fa" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Showing price and stock for all products
        </div>
      </CardFooter>
    </Card>
  );
}
