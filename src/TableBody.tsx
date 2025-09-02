import React, { useEffect, useRef } from "react";
// import { Table, Input } from "semantic-ui-react";
import { useSnapshot } from "valtio";
import { state } from "./Store";
import { TableCounters } from "./TableCounters";

import mexp from "math-expression-evaluator";

export const TableBody = React.memo(() => {
  return (
    <>
      <TableCounters>
        <tr className="bg-white">
          <Counted />
          <td colSpan={3}>Counted</td>
        </tr>

        <tr className="bg-white">
          <Required />
          <td colSpan={3}>Required</td>
        </tr>
        <tr className="bg-white">
          <Difference />
          <td colSpan={3}>Difference</td>
        </tr>
      </TableCounters>
    </>
  );
});

export function Difference() {
  const total = useSnapshot(state).value.total;
  const required = useSnapshot(state).value.required;
  return (
    <td
      className={total - required.value !== 0 ? "bg-red-100	" : "bg-green-100"}
    >
      {new Intl.NumberFormat("en-EG").format(total - required.value)}
    </td>
  );
}

export function Counted() {
  const total = useSnapshot(state).value.total;
  return <td>{new Intl.NumberFormat("en-EG").format(total)}</td>;
}

export function Required() {
  const requiredIsEdited = useSnapshot(state).value.requiredIsEdited;
  const required = useSnapshot(state).value.required;
  return (
    <td>
      <input
        // type={requiredIsEdited ? "number" : "text"}
        type="text"
        className="h-full"
        // string wrapper to remove zeros from left
        value={
          requiredIsEdited
            ? required.text.toString()
            : new Intl.NumberFormat("en-EG").format(required.value)
        }
        onFocus={() => (state.value.requiredIsEdited = !requiredIsEdited)}
        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
          state.value.requiredIsEdited = !requiredIsEdited;
        }}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          state.value.required.text = e.currentTarget.value;

          if (e.currentTarget.value.toString().startsWith("=")) {
            let newCount: number = 0;
            try {
              newCount = +mexp.eval(e.currentTarget.value.split("=")[1]);
            } catch (e) {
              // console.log(e);
              state.value.required.value = 0;
            }
            state.value.required.value = newCount;
          } else {
            state.value.required.value = Number.isNaN(+e.currentTarget.value)
              ? 0
              : +e.currentTarget.value;
          }

          // state.value.required.value = Math.trunc(
          //   Number(e.currentTarget.value)
          // );
        }}
      />
    </td>
  );
}
