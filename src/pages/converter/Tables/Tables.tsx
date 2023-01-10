export const Tables: React.FC = () => {
  return (
    <div className="flex justify-between ">
      <div className="w-2/5 flex ">
        <table className="w-full table-collapse">
          <thead>
            <tr>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Date</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Exchange Rate</th>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white"></th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            <tr className="group cursor-pointer hover:bg-gray-100">
              <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">Dang Van Thanh</td>
              <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">Sep, 11 2018</td>
              <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap text-sm group-hover:visible">
                <div className="invisible group-hover:visible">
                  <a href="#" className="no-underline text-blue">
                    View
                  </a>
                  <span className="text-grey">|</span>
                  <a href="#" className="no-underline text-blue">
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-2/5 flex">
        <table className="w-full table-collapse">
          <thead>
            <tr>
              <th className="text-sm text-left font-semibold text-table-header p-3 bg-white">Statistics</th>
              <th className="text-sm uppercase font-semibold text-table-header p-3 bg-white"></th>
            </tr>
          </thead>
          <tbody className="align-baseline">
            <tr className="group cursor-pointer hover:bg-gray-100">
              <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">Dang Van Thanh</td>
              <td className="text-sm p-3 border-t border-grey-light whitespace-no-wrap">Sep, 11 2018</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
