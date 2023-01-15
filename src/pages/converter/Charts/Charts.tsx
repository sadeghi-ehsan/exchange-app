import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useAppSelector } from "@/hooks/redux";
import { IRatesHistory } from "@/pages/converter/types";

export const Charts: React.FC = ({ currentState }) => {
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [chartData, setChartData] = useState([]);
  const [history, setHistory] = useState<IRatesHistory>({
    base: "",
    end_date: "",
    motd: { msg: "", url: "" },
    rates: {},
    start_date: "",
    success: false,
    timeseries: false
  });

  useEffect(() => {
    const { exchangeRateHistory } = exchangeRedux;
    setHistory(exchangeRateHistory);
  }, [exchangeRedux]);

  useEffect(() => {
    if (history?.success) {
      const { rates } = history;
      const { to } = currentState;
      let chrtData: any[] = [];
      rates &&
        Object.keys(rates).map(item => {
          let temp = { date: item, rate: rates[item][to] };
          chrtData = [...chrtData, temp];
        });
      setChartData(chrtData.map(item => item.rate));
    }
  }, [history]);

  return (
    <div className="  ">
      <Sparklines data={chartData}>
        <SparklinesLine style={{ fill: "none" }} />
      </Sparklines>
    </div>
  );
};
