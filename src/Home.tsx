import TablePage from "./Table";
// import { Checkbox, Container, Segment, Button, Grid } from "semantic-ui-react";
import { actions, state } from "./Store";
import { useSnapshot } from "valtio";

import { Switch } from "@headlessui/react";

function Home() {
  const { moreCurrency, coinCurrency, hundreds } = useSnapshot(state).value;
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const {
    reset,
    addDW,
    removeDW,
    coinCurrencyFn,
    moreCurrencyFn,
    hundredsFn,
    undo,
    redo,
  } = actions;

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Money Counter
      </h2>

      <TablePage />
      <div
        // grid grid-flow-row-dense	gap-5 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-4 grid-cols-6 grid-rows-3 max-sm:grid-cols-2

        className="mt-3 grid max-sm:grid-flow-col sm:grid-cols-3 sm:grid-rows-2 max-sm:grid-cols-2 max-sm:grid-rows-3 gap-5 xl:grid-cols-6"
      >
        <div className=" max-sm:justify-self-start flex justify-center items-center">
          <Switch.Group as="div" className="flex ">
            <Switch
              className={classNames(
                moreCurrency ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
              checked={moreCurrency}
              onClick={moreCurrencyFn}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  moreCurrency ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">
                More categories
              </span>
              {/* <span className="text-sm text-gray-500">(Save 10%)</span> */}
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="max-sm:justify-self-start flex justify-center items-center">
          <Switch.Group as="div" className="flex">
            <Switch
              className={classNames(
                coinCurrency ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
              checked={coinCurrency}
              onClick={coinCurrencyFn}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  coinCurrency ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">Coins</span>
              {/* <span className="text-sm text-gray-500">(Save 10%)</span> */}
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className=" max-sm:justify-self-start flex justify-center items-center ">
          <Switch.Group as="div" className="flex">
            <Switch
              className={classNames(
                hundreds ? "bg-indigo-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
              checked={hundreds}
              onClick={hundredsFn}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  hundreds ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm font-medium text-gray-900">
                Hundreds
              </span>
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className=" flex justify-center items-center">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              onClick={redo}
              type="button"
              className="relative inline-flex justify-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Redo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-mr-1 ml-2 h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
            <button
              onClick={undo}
              type="button"
              className="-ml-px relative inline-flex justify-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                />
              </svg>
              Undo
            </button>
          </span>
        </div>
        <div className=" flex justify-center items-center">
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              onClick={removeDW}
              type="button"
              className="relative inline-flex justify-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Remove
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-mr-1 ml-2 h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </button>
            <button
              onClick={addDW}
              type="button"
              className="-ml-px relative inline-flex justify-center items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-r-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add
            </button>
          </span>
        </div>
        <div className="">
          <button
            className="inline-flex justify-center  px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
