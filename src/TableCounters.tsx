// import { Table } from "semantic-ui-react";
import { useSnapshot } from "valtio";
import { state } from "./Store";
import Counter from "./Counter";
import React, { useEffect, useState } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";

export const TableCounters = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<JSX.Element[]>([]);
    const ids = useSnapshot(state).value.ids;
    useEffect(() => {
      setItems(() => ids.map((x) => <TableCell x={x} key={x} />));
    }, [ids]);

    return (
      <Reorder.Group
        onReorder={setItems}
        as="tbody"
        axis="x"
        className="tabs"
        values={items}
      >
        <AnimatePresence>
          {items.map((item) => (
            <Reorder.Item
              key={item.key}
              as="tr"
              value={item}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {item}
            </Reorder.Item>
          ))}
        </AnimatePresence>
        {children}
      </Reorder.Group>
    );
  }
);

const TableCell = ({ x }: { x: number }) => {
  if (!state.value.data[x]) return null;
  // if ()
  const { category } = useSnapshot(state).value.data[x];
  const { hundreds } = useSnapshot(state).value;

  return (
    <>
      <td>
        <Counter id={x} indicator="total" />
      </td>
      {hundreds &&
        (Number(category) === 0.5 ||
          Number(category) === 0.25 ||
          Number.isInteger(category)) && (
          <td>
            <Counter id={x} indicator="hundreds" />
          </td>
        )}
      <td
        colSpan={
          hundreds &&
          Number(category) !== 0.5 &&
          Number(category) !== 0.25 &&
          !Number.isInteger(category)
            ? 2
            : 0
        }
      >
        <Counter id={x} indicator="count" />
      </td>
      <td
        contentEditable={
          !(
            Number(category) === 0.5 ||
            Number(category) === 0.25 ||
            Number.isInteger(category)
          )
        }
      >
        {Number(category) === 0.5 ||
        Number(category) === 0.25 ||
        Number.isInteger(category)
          ? new Intl.NumberFormat("en-EG").format(Number(category))
          : category}
      </td>
    </>
  );
};
