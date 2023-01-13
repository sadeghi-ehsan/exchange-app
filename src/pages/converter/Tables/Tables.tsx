import { useEffect, useState } from "react";
import { Divider } from "@/components/Atoms/Divider";
import { useAppSelector } from "@/hooks/redux";
import { IRatesHistory } from "../types";
import { commaSeparator } from "@/utils";

export const Tables: React.FC = props => {
  const exchangeRedux = useAppSelector(state => state.exchangeSlice);
  const [history, setHistory] = useState<IRatesHistory>({
    base: "",
    end_date: "",
    motd: { msg: "", url: "" },
    rates: {},
    start_date: "",
    success: false,
    timeseries: false
  });
  const [tblData, setTblData] = useState<[{ date: string; rate: number }]>([{ date: "", rate: 1 }]);

  useEffect(() => {
    const { exchangeRateHistory } = exchangeRedux;
    setHistory(exchangeRateHistory);
  }, [exchangeRedux]);

  useEffect(() => {
    const { rates } = history;
    const { from, to } = props.currentState;
    let tableData: any[] = [];
    rates &&
      Object.keys(rates).map(item => {
        let temp = { date: item, rate: rates[item][to] };
        tableData = [...tableData, temp];
      });
    console.log("tableData", tableData);
    setTblData(tableData);
  }, [history]);
  return (
    <div className="flex justify-between  ">
      <div className="w-2/5 flex shadow-2xl max-h-125 overflow-y-auto">
        <table className="w-full table-collapse ">
          <thead>
            <tr>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Date</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Exchange Rate</th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            {tblData.length > 0 &&
              tblData.map((item, idx) => {
                return (
                  <tr key={idx} className="group cursor-pointer bg-white hover:bg-gray-100">
                    <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">{item.date}</td>
                    <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">{item.rate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {tblData.length > 0 && (
        <div className="w-2/5 flex shadow-2xl max-h-44">
          <div className="flex flex-col w-full ">
            <span className="text-sm text-left font-semibold text-table-header p-3 bg-white">Statistics</span>
            <div className="flex flex-col w-full">
              <Divider />
              <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
                <span className="text-sm p-3 pr-12  ">Lowest</span>
                <span className="text-sm p-3 px-12  ">{Math.min(...tblData.map(item => item?.rate))}</span>
              </div>
              <Divider />
              <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
                <span className="text-sm p-3 pr-12 ">Highest</span>
                <span className="text-sm p-3 px-12 ">{Math.max(...tblData.map(item => item?.rate))}</span>
              </div>
              <Divider />
              <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
                <span className="text-sm p-3 pr-12 ">Average</span>
                <span className="text-sm p-3 px-12 ">
                  {commaSeparator(
                    (Math.min(...tblData.map(item => item.rate)) + Math.max(...tblData.map(item => item?.rate))) / 2,
                    6,
                    true
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
