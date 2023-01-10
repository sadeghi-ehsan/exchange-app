import { useEffect, useState } from "react";
import { Divider } from "@/components/Atoms/Divider";

export const Tables: React.FC = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    let prevHistory = JSON.parse(localStorage.getItem("history") || "{}");
    setHistory(prevHistory);
  }, []);

  useEffect(() => {
    console.log("history", history);
  }, [history]);
  return (
    <div className="flex justify-between ">
      <div className="w-2/5 flex shadow-2xl">
        <table className="w-full table-collapse">
          <thead>
            <tr>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Date</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Exchange Rate</th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            {history.map((item, idx) => {
              return (
                <tr key={idx} className="group cursor-pointer bg-white hover:bg-gray-100">
                  <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">{item.date}</td>
                  <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">{item.info.rate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="w-2/5 flex shadow-2xl ">
        <div className="flex flex-col w-full ">
          <span className="text-sm text-left font-semibold text-table-header p-3 bg-white">Statistics</span>
          <div className="flex flex-col w-full">
            <Divider />
            <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
              <span className="text-sm p-3 pr-12  ">Lowest</span>
              <span className="text-sm p-3 px-12  ">Sep, 11 2018</span>
            </div>
            <Divider />
            <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
              <span className="text-sm p-3 pr-12 ">Highest</span>
              <span className="text-sm p-3 px-12 ">Sep, 11 2018</span>
            </div>
            <Divider />
            <div className="group cursor-pointer bg-white hover:bg-gray-100 flex ">
              <span className="text-sm p-3 pr-12 ">Average</span>
              <span className="text-sm p-3 px-12 ">Sep, 11 2018</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
