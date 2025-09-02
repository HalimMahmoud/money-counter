// import { Table } from "semantic-ui-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import { state } from "./Store";
import { TableBody } from "./TableBody";

const TablePage = () => {
  const { hundreds } = useSnapshot(state).value;

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                    // style={{ width: "40%" }}
                  >
                    Total
                  </th>

                  <AnimatePresence>
                    {hundreds && (
                      <motion.th
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        scope="col"
                        className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] w-1/5"
                      >
                        Hundreds
                      </motion.th>
                    )}
                  </AnimatePresence>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                    // style={{ width: "20%" }}
                  >
                    Count
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                    // style={{ width: "20%" }}
                  >
                    Category
                  </th>
                </tr>
              </thead>
              <TableBody />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
