import { devtools } from "valtio/utils";
import Home from "./Home";
import { state } from "./Store";

// import { immer } from "zustand/middleware/immer";

export default function App() {
  // useEffect(() => {
  //   const unsubscribe = subscribe(state, () =>
  //     console.log("state has changed to", state)
  //   );
  //   // Unsubscribe by calling the result

  //   return () => unsubscribe();
  // });

  const unsub = devtools(state, { name: "valito", enabled: true });

  return <Home />;
}
