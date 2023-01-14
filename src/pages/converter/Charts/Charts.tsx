import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { useAppSelector } from "@/hooks/redux";

export const Charts: React.FC = () => {
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    console.log("exchangeRedux", exchangeRedux);
    const { exchangeChartData } = exchangeRedux;
    setChartData(exchangeChartData.map(item => item.rate));
  }, []);
  return (
    <div className="  ">
      <Sparklines data={chartData}>
        <SparklinesLine style={{ fill: "none" }} />
      </Sparklines>
    </div>
  );
};
