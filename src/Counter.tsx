import React, { useState } from "react";
// import { Input } from "semantic-ui-react";
import { useSnapshot } from "valtio";
import { actions, C, state } from "./Store";
import { motion, AnimatePresence } from "framer-motion";

function Counter({ id, indicator }: { id: number; indicator: string }) {
  if (!state.value.data[id]) return null;

  const [editing, setEditing] = useState(false);
  // const [value, setValue] = useState("");
  const snap = useSnapshot(state).value.data[id][indicator as keyof C];

  const isHundreds = useSnapshot(state).value.hundreds;
  const { recalculate, update } = actions;

  const ref = React.useRef<any>();

  const inputValueR = () => {
    if (editing) {
      return snap.text.toString();
    } else {
      if (indicator === "hundreds") {
        return new Intl.NumberFormat("en-EG").format(
          Math.trunc(Number(snap.value))
        );
      } else if (indicator === "total") {
        return new Intl.NumberFormat("en-EG").format(Number(snap.value));
      } else {
        return new Intl.NumberFormat("en-EG").format(Number(snap.value));
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex items-stretch flex-grow focus-within:z-10 w-full h-full"
      >
        <input
          type={"text"}
          className="h-full"
          style={{
            textAlign: indicator === "hundreds" ? "left" : "center",
            textIndent: indicator === "hundreds" ? "10px" : "0px",
          }}
          ref={ref}
          value={inputValueR()}
          onClick={(e) => {
            setEditing(true);
          }}
          onFocus={() => {
            setEditing(true);
          }}
          onBlur={(e: React.FormEvent<HTMLInputElement>) => {
            setEditing(false);
          }}
          onChange={(e) => {
            e.preventDefault();

            setEditing(true);

            update(e, indicator, id);
            recalculate(e, id, indicator);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            let el = ref?.current;
            // console.log(ref.current);

            const arr: any[] =
              ref?.current?.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
                "input"
              );

            let listOfEls = Array.prototype.slice.call(arr, 0, -1);

            let index = listOfEls.findIndex((x: any) => x === el);
            let nextIndex = (index: number) =>
              index + 3 >= listOfEls.length ? index : index + 3;

            if (e.code === "Enter" || e.code === "NumpadEnter") {
              listOfEls[nextIndex(index)].focus();
            }

            if (e.code === "ArrowLeft") {
              const newIndex = index > 0 ? index - 1 : 0;
              if (newIndex !== index) listOfEls[newIndex].focus();
            }
            if (e.code === "ArrowUp") {
              const newIndex =
                index >= (isHundreds ? 3 : 2)
                  ? index - (isHundreds ? 3 : 2)
                  : index;

              // listOfEls.length - 1 > index ? index + 1 : listOfEls.leSngth - 1;

              if (newIndex !== index) listOfEls[newIndex].focus();
            }
            if (e.code === "ArrowRight") {
              const newIndex =
                listOfEls.length - 1 > index ? index + 1 : listOfEls.length - 1;

              if (newIndex !== index) listOfEls[newIndex].focus();
            }
            if (e.code == "ArrowDown") {
              const newIndex =
                index + (isHundreds ? 3 : 2) >= listOfEls.length
                  ? index
                  : index + (isHundreds ? 3 : 2);

              // listOfEls.length - 1 > index ? index + 1 : listOfEls.length - 1;

              if (newIndex !== index) listOfEls[newIndex].focus();
            }
            return e.code;
          }}
        />
        {indicator === "hundreds" && !editing && (
          <div className="-ml-px absolute right-0 top-0 inline-flex items-center space-x-2 max-sm:px-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50">
            {`.${
              Number(+snap.value % 1)
                .toFixed(2)
                .split(".")[1]
            }`}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(Counter);

// valueSetter: function (params) {
//   if (params.newValue.toString().includes('=')) {
//     console.log(
//       params.newValue
//         .toString()
//         .split('=')[1]
//         .split('+')
//         .reduce((x, y) => +x + +y)
//     );
//     params.data.a = params.newValue
//       .toString()
//       .split('=')[1]
//       .split('+')
//       .reduce((x, y) => +x + +y);
//   } else {
//     params.data.a = params.newValue;
//   }

//   return true;
// },
