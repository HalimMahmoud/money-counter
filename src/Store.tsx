import { proxyWithHistory } from "valtio/utils";
import cloneDeep from "lodash/cloneDeep";
// import { create, evaluateDependencies } from "mathjs";
// var mexp = require("math-expression-evaluator");
import mexp from "math-expression-evaluator";
// const math = create(evaluateDependencies);
export interface S {
  data: Record<number, B>;
  required: A;
  requiredIsEdited: boolean;
  coinCurrency: boolean;
  moreCurrency: boolean;
  addons: number;
  hundreds: boolean;
  total: number;
  input: string;
  ids: number[];
}
export interface B extends C {
  id: number;
  category: number | string;
}

export interface A {
  text: string;
  value: number;
}

export interface C {
  count: A;
  hundreds: A;
  total: A;
}

// trunc or delete unnecessary decimal digits 9.7 => 9 || 9.3 => 9
const cutDec = (value: number | string) => Math.trunc(Number(value));
// get string value from actual number to put it back in form state
const strNum = (value: number | string) => Number(value).toString();

const tTotal = (value: number, category: number) => {
  const bako = category * 100;
  return Number(Math.trunc(value / bako) * bako);
};

// const bawaky = (value: number, category: number) => {};
export const initial = {
  data: {
    2: {
      id: 2,
      category: 200,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    3: {
      id: 3,
      category: 100,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    4: {
      id: 4,
      category: 50,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    5: {
      id: 5,
      category: 20,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    6: {
      id: 6,
      category: 10,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    7: {
      id: 7,
      category: 5,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
    9: {
      id: 9,
      category: 1,
      count: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
      total: { text: "", value: 0 },
    },
  },
  required: { text: "", value: 0 },
  requiredIsEdited: false,
  coinCurrency: false,
  moreCurrency: false,
  addons: 0,
  hundreds: true,
  input: "",
  total: 0,
  ids: [2, 3, 4, 5, 6, 7, 9],
};

export const state = proxyWithHistory<S>(initial);

export const actions = {
  update: (
    e: React.FormEvent<HTMLInputElement>,
    indicator: string,
    id: number
  ) => {
    e.preventDefault();

    state.value.data[id][indicator as keyof C].text = e.currentTarget.value;

    if (e.currentTarget.value.toString().startsWith("=")) {
      let newCount: number = 0;
      try {
        newCount = +mexp.eval(e.currentTarget.value.split("=")[1]);
      } catch (e) {
        // console.log(e);
        state.value.required.value = 0;
      }
      state.value.data[id][indicator as keyof C].value = newCount;
    } else {
      state.value.data[id][indicator as keyof C].value = Number.isNaN(
        +e.currentTarget.value
      )
        ? 0
        : +e.currentTarget.value;
    }
  },
  recalculate: (
    e: React.FormEvent<HTMLInputElement>,
    id: number,
    indicator: string
  ) => {
    // if (
    //   e.currentTarget.value !== state.value.data[id][indicator as keyof C].text
    // ) {
    let newCount = Number.isNaN(
      +state.value.data[id][indicator as keyof C].value
    )
      ? 0
      : +state.value.data[id][indicator as keyof C].value;
    if (
      Number(state.value.data[id].category) !== 0.5 &&
      Number(state.value.data[id].category) !== 0.25 &&
      typeof state.value.data[id].category === "string" &&
      !Number.isInteger(state.value.data[id].category)
    ) {
      state.value.data[id].count.value = cutDec(newCount);
      state.value.data[id].total.value = cutDec(newCount);
      if (indicator === "count")
        state.value.data[id].total.text = cutDec(newCount).toString();
      if (indicator === "total")
        state.value.data[id].count.text = cutDec(newCount).toString();
    } else {
      const functionOperation = {
        count: () => {
          state.value.data[id].count.value = cutDec(newCount);
          state.value.data[id].hundreds.value = +Number(newCount / 100).toFixed(
            2
          );
          state.value.data[id].total.value =
            +state.value.data[id].category * cutDec(newCount);

          state.value.data[id].hundreds.text = Number(newCount / 100)
            .toFixed(2)
            .toString();
          state.value.data[id].total.text = (
            +state.value.data[id].category * cutDec(newCount)
          ).toString();
        },
        hundreds: () => {
          state.value.data[id].count.value = cutDec(newCount * 100);
          state.value.data[id].hundreds.value = +Number(newCount).toFixed(2);
          state.value.data[id].total.value =
            +state.value.data[id].category * cutDec(newCount * 100);

          state.value.data[id].count.text = cutDec(newCount * 100).toString();
          state.value.data[id].total.text = (
            +state.value.data[id].category * cutDec(newCount * 100)
          ).toString();
        },
        total: () => {
          state.value.data[id].count.value = cutDec(
            tTotal(newCount, +state.value.data[id].category) /
              +state.value.data[id].category
          );
          state.value.data[id].hundreds.value = +Number(
            tTotal(newCount, +state.value.data[id].category) /
              100 /
              +state.value.data[id].category
          ).toFixed(2);

          state.value.data[id].total.value = tTotal(
            newCount,
            +state.value.data[id].category
          );

          state.value.data[id].count.text = cutDec(
            tTotal(newCount, +state.value.data[id].category) /
              +state.value.data[id].category
          ).toString();
          state.value.data[id].hundreds.text = Number(
            tTotal(newCount, +state.value.data[id].category) /
              100 /
              +state.value.data[id].category
          )
            .toFixed(2)
            .toString();
        },
      };
      functionOperation[indicator as keyof typeof functionOperation]();
    }
    actions.updateTotal();

    // console.log(state.value.data);
    // }
  },
  addDW: () => {
    ++state.value.addons;
    state.value.data[11 + state.value.addons] = {
      id: 11 + state.value.addons,
      category: `D/W No.${state.value.addons}`,
      count: { text: "", value: 0 },
      total: { text: "", value: 0 },
      hundreds: { text: "", value: 0 },
    };

    actions.updateIds();
  },
  removeDW: () => {
    Object.values(state.value.data).find(
      (x) =>
        Number(x.category) !== 0.5 &&
        Number(x.category) !== 0.25 &&
        !Number.isInteger(x.category)
    ) &&
      delete state.value.data[11 + state.value.addons] &&
      --state.value.addons;

    actions.updateIds();
  },
  moreCurrencyFn: () => {
    if (!state.value.data[0] && !state.value.data[1] && !state.value.data[8]) {
      state.value.data[0] = {
        id: 0,
        category: 1000,
        count: { text: "", value: 0 },
        hundreds: { text: "", value: 0 },
        total: { text: "", value: 0 },
      };

      state.value.data[1] = {
        id: 1,
        category: 500,
        count: { text: "", value: 0 },
        hundreds: { text: "", value: 0 },
        total: { text: "", value: 0 },
      };
      state.value.data[8] = {
        id: 8,
        category: 2,
        count: { text: "", value: 0 },
        hundreds: { text: "", value: 0 },
        total: { text: "", value: 0 },
      };
    } else {
      delete state.value.data[0];
      delete state.value.data[1];
      delete state.value.data[8];
    }
    state.value.moreCurrency = !state.value.moreCurrency;

    actions.updateIds();
  },
  coinCurrencyFn: () => {
    if (!state.value.data[10] && !state.value.data[11]) {
      state.value.data[10] = {
        id: 10,
        category: 0.5,
        count: { text: "", value: 0 },
        hundreds: { text: "", value: 0 },
        total: { text: "", value: 0 },
      };
      state.value.data[11] = {
        id: 11,
        category: 0.25,
        count: { text: "", value: 0 },
        hundreds: { text: "", value: 0 },
        total: { text: "", value: 0 },
      };
    } else {
      delete state.value.data[10];
      delete state.value.data[11];
    }
    state.value.coinCurrency = !state.value.coinCurrency;
    actions.updateIds();
  },
  reset: () => {
    state.value.data = cloneDeep(initial.data);
    state.value.required = cloneDeep(initial.required);
    state.value.requiredIsEdited = initial.requiredIsEdited;
    state.value.coinCurrency = initial.coinCurrency;
    state.value.moreCurrency = initial.moreCurrency;
    state.value.addons = initial.addons;
    state.value.hundreds = initial.hundreds;

    actions.updateIds();

    actions.updateTotal();
    // actions.recalculate();
  },
  undo: () => {
    state.undo();
    actions.updateIds();
  },
  updateTotal: () => {
    state.value.total = Object.values(state.value.data)
      .map((x) => x.total.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  },
  updateIds: () => {
    state.value.ids = Object.keys(state.value.data).map(Number);
  },
  redo: () => {
    state.redo();
    actions.updateIds();
  },
  hundredsFn: () => {
    state.value.hundreds = !state.value.hundreds;
  },
};
