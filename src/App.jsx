import Home from "./components/Home";
import { proxyWithComputed, proxyWithHistory } from "valtio/utils";
import { devtools } from "valtio/utils";

export const initial = {
  data: [
    { id: 2, category: 200, count: 0, hundreds: 0, total: 0 },
    { id: 3, category: 100, count: 0, hundreds: 0, total: 0 },
    { id: 4, category: 50, count: 0, hundreds: 0, total: 0 },
    { id: 5, category: 20, count: 0, hundreds: 0, total: 0 },
    { id: 6, category: 10, count: 0, hundreds: 0, total: 0 },
    { id: 7, category: 5, count: 0, hundreds: 0, total: 0 },
    { id: 9, category: 1, count: 0, hundreds: 0, total: 0 },
  ],
  required: 0,
  requiredIsEdited: false,
  coinCurrency: false,
  moreCurrency: false,
  addons: 0,
  currentInput: 0,
};

const computedState = proxyWithComputed(initial, {
  total: (snap) => {
    return snap.data
      .map((x) => x.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  },
  length: (snap) => snap.data.length,
});

export const state = proxyWithHistory(computedState);
function App() {
  // console.log(state);

  return <Home />;
}

export default App;
