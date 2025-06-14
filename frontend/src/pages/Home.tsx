import { ChartAreaStacked } from "@/components/AreaChart";
import { ChartBar } from "@/components/ChartBar";
import { ChartLineDots } from "@/components/LineDotChart";
import Navbar from "@/components/Navbar";
import { ChartPieDonutText } from "@/components/PiChart";
import { ChartRadialShape } from "@/components/RadialChart";
import { ChartRadialLabel } from "@/components/RadialChartLabel";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
            <ChartBar />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
            <ChartRadialLabel />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
            <ChartPieDonutText />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
            <ChartLineDots />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
            <ChartAreaStacked />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">
            <ChartRadialShape />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
