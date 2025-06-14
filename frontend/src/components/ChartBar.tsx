"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

// Define expected product type
type Product = {
  name: string;
  price: number;
  stocks: number;
};

// Define chart config
const chartConfig = {
  price: {
    label: "Price",
    color: "#2563eb", // blue-600
  },
  stocks: {
    label: "Stock",
    color: "#60a5fa", // blue-400
  },
} satisfies ChartConfig;

export function ChartBar() {
  const { products } = useSelector((state: RootState) => state.product);

  // Convert Redux products into chart format
  const chartData =
    products?.map((product: Product) => ({
      name:
        product.name.length > 10
          ? product.name.slice(0, 10) + "…"
          : product.name,
      price: product.price,
      stocks: product.stocks,
    })) || [];

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart width={500} height={300} data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Legend />
        <Bar dataKey="price" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="stocks" fill="#60a5fa" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
