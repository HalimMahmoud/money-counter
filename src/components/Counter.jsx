import { Input } from "semantic-ui-react";
import { state } from "../App";
import { useState, useRef, useCallback, useEffect, useMemo, memo } from "react";
import { useSnapshot } from "valtio";

const Counter = React.memo(
  ({ id, category, count, hundreds, total, indicator }) => {
    const snap = useSnapshot(state).value;
    useEffect(() => {
      console.log(id, indicator, "render Counter");
    });
    const ref = useRef();
    const [editing, setEditing] = useState(false);

    const y = snap.data.find((x) => x.id === id);

    const changeValue = (e) => {
      const newCount = Number(e.target.value);

      state.value.data[snap.data.findIndex((x) => x.id === id)] = {
        id,
        category: y.category,
        count: y.count,
        hundreds: y.hundreds,
        total: y.total,
        [indicator]: newCount,
      };
    };

    const recalculate = (e) => {
      const newCount = Number(e.target.value);

      state.value.data[snap.data.findIndex((x) => x.id === id)] = {
        // id,
        // category: y.category,
        // count: y.count,
        // hundreds: y.hundreds,
        // total: y.total,
        // [indicator]: newCount,
        ...computeValues(
          indicator,
          newCount,
          y.category,
          snap.data.find((x) => x.id === id)
        ),
      };
      // const newData = state.value.data.map((x) => accumulate(x));

      // state.value.data = newData;
    };

    const toggleEditing = () => setEditing((pre) => !pre);

    const handleEnterDown = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        let el = ref.current.inputRef.current;
        let listOfEls = [
          ...ref.current.inputRef.current.parentElement.parentElement.parentElement.parentElement.getElementsByTagName(
            "input"
          ),
        ];

        let index = listOfEls.findIndex((x) => x === el);
        let nextIndex = (index) =>
          index + 3 >= listOfEls.length ? listOfEls.length - 1 : index + 3;
        listOfEls[nextIndex(index)].focus();
      } else {
        return e.code;
      }
    };

    return editing ? (
      <Input
        type="number"
        ref={ref}
        value={
          indicator === "hundreds"
            ? strNum(y.hundreds)
            : indicator === "total"
            ? strNum(y.total)
            : strNum(y.count)
        }
        onChange={(e) => {
          changeValue(e);
        }}
        onBlur={(e) => {
          toggleEditing();
          recalculate(e);
        }}
        onKeyDown={handleEnterDown}
      />
    ) : (
      <Input
        ref={ref}
        type="text"
        value={
          indicator === "hundreds"
            ? strNum(y.hundreds)
            : indicator === "total"
            ? new Intl.NumberFormat("en-EG").format(strNum(y.total))
            : strNum(y.count)
        }
        onFocus={toggleEditing}
      />
    );
  }
);
/// Math helpers shortcuts
// trunc or delete unnecessary decimal digits 9.7 => 9 || 9.3 => 9
const cutDec = (value) => Math.trunc(Number(value));
// get string value from actual number to put it back in form state
const strNum = (value) => Number(value).toString();
// trunc total to suit multiple of the category
const tTotal = (value, category) => {
  return Number(Math.trunc(value / category) * category);
};

const computeValues = (indicator, newCount, category, x) => {
  function currencyExist() {
    switch (indicator) {
      case "count":
        return {
          id: x.id,
          category,
          count: cutDec(newCount),
          hundreds: Number(newCount / 100),
          total: x.category * cutDec(newCount),
        };
      case "hundreds":
        return {
          id: x.id,
          category,
          count: cutDec(newCount * 100),
          hundreds: Number(newCount),
          total: x.category * cutDec(newCount * 100),
        };
      case "total":
        return {
          id: x.id,
          category,
          count: cutDec(tTotal(newCount, category) / x.category),
          hundreds: Number(tTotal(newCount, category) / 100 / x.category),
          total: tTotal(newCount, category),
        };
    }
  }
  return Number(category) !== 0.5 &&
    Number(category) !== 0.25 &&
    !Number.isInteger(category)
    ? {
        id: x.id,
        category,
        count: cutDec(newCount),
        total: cutDec(newCount),
      }
    : currencyExist();
};

export default React.memo(Counter);
