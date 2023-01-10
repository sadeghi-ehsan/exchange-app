import React, { useEffect, useState } from "react";

const History: React.FC = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    let prevHistory = JSON.parse(localStorage.getItem("history") || "{}");
    setHistory(prevHistory);
  }, []);

  const remove = (idx: number): void => {
    let history = JSON.parse(localStorage.getItem("history") || "{}");
    history.splice(idx, 1);
    console.log("result", history);
    localStorage.setItem("history", JSON.stringify(history));
  };
  return (
    <div className="px-24 py-9">
      <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">Conversion History</h1>
      <div className="w-full flex shadow-2xl">
        <table className="w-full table-collapse">
          <thead>
            <tr>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Date</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Event</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Actions</th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            {history?.map((item, idx) => {
              return (
                <tr key={idx} className="group cursor-pointer bg-white hover:bg-gray-100">
                  <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                    {`${item.date} @ ${item.date}`}
                  </td>
                  <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                    {`Converted an amount of ${item.query.amount} from ${item.query.from} to ${item.query.to}`}
                  </td>
                  <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap text-sm group-hover:visible">
                    <div className="invisible group-hover:visible flex justify-between items-baseline space-x-6">
                      <a href="#" className="no-underline text-blue flex items-center">
                        <img src="/icons/remove_red_eye.svg" alt="view" width={30} height={30} />
                        View
                      </a>
                      <a href="#" className="no-underline text-blue flex items-center" onClick={() => remove(idx)}>
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
    </div>
  );
};

export default History;
