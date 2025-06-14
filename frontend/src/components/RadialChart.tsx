import { TrendingUp } from "lucide-react";
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

// Define product type
type Product = {
  name: string;
  price: number;
  stocks: number;
};

// Chart config
const chartConfig = {
  visitors: {
    label: "Stocks",
  },
} satisfies ChartConfig;

// Define color palette
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a0522d",
  "#8a2be2",
  "#20b2aa",
  "#f08080",
];

export function ChartRadialShape() {
  const { products } = useSelector((state: RootState) => state.product);

  // Generate chart data with colors
  const chartData =
    products?.map((product: Product, index: number) => ({
      name: product.name,
      visitors: product.stocks,
      fill: COLORS[index % COLORS.length], // Assign color from palette
    })) || [];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Product Stocks</CardTitle>
        <CardDescription>Live Inventory Overview</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid radialLines={false} stroke="none" />
            <RadialBar
              dataKey="visitors"
              background
              label={{ position: "insideStart", fill: "#fff" }}
            />
            <PolarRadiusAxis tick={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {(chartData[0]?.visitors ?? 0).toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Stocks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total product stocks
        </div>
      </CardFooter>
    </Card>
  );
}
