import React, { useEffect, useState } from "react";
import { Query } from "@/pages/converter/types";
import { useRouter } from "next/router";

const History: React.FC = () => {
  const [history, setHistory] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getHistory();
  }, []);

  const remove = (idx: number): void => {
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.splice(idx, 1);
    localStorage.setItem("history", JSON.stringify(history));
    getHistory();
  };

  const sendParams = (query: Query): void => {
    router.push({ pathname: "/", query: query }, "/");
  };
  const getHistory = (): void => {
    let prevHistory = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(prevHistory);
  };
  return (
    <div className="px-24 py-9 ">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">Conversion History</h1>
      {history.length > 0 ? (
        <div className="w-full flex shadow-2xl overflow-y-auto max-h-150">
          <table className="w-full table-collapse">
            <thead>
              <tr>
                <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Date</th>
                <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Event</th>
                <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Actions</th>
              </tr>
            </thead>
            <tbody className="align-baseline">
              {history.map((item, idx) => {
                return (
                  <tr key={idx} className="group bg-white hover:bg-gray-100">
                    <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                      {`${item.date} @ ${item.time}`}
                    </td>
                    <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                      {`Converted an amount of ${item.query.amount} from ${item.query.from} to ${item.query.to}`}
                    </td>
                    <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap text-sm group-hover:visible">
                      <div className="invisible group-hover:visible flex justify-between items-baseline space-x-6">
                        <a
                          href="#"
                          className="no-underline text-blue flex items-center text-primary cursor-pointer font-bold"
                          onClick={() => sendParams(item.query)}
                        >
                          <img src="/icons/remove_red_eye.svg" alt="view" width={30} height={30} />
                          View
                        </a>
                        <a
                          href="#"
                          className="no-underline text-blue flex items-center text-warn cursor-pointer font-bold"
                          onClick={() => remove(idx)}
                        >
                          <img src="/icons/delete_forever.svg" alt="delete" width={30} height={30} />
                          Delete from history
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center text-default-text">
          <h1 className="font-bold text-2xl">No history found!</h1>
        </div>
      )}
    </div>
  );
};

export default History;
