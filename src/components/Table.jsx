import { Table, Input } from "semantic-ui-react";
import Counter from "./Counter";
import { state } from "../App";
import { useSnapshot } from "valtio";

import memoize from "proxy-memoize";

const TablePage = () => {
  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Hundreds</Table.HeaderCell>
          <Table.HeaderCell>Count</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Body />
    </Table>
  );
};
export default TablePage;

const FN = React.memo(({ data, length }) => {
  return data.map((x) => (
    <Table.Row key={x.id}>
      <Table.Cell textAlign="right" width={7}>
        <Counter {...x} indicator="total" />
      </Table.Cell>
      {(Number(x.category) === 0.5 ||
        Number(x.category) === 0.25 ||
        Number.isInteger(x.category)) && (
        <Table.Cell width={3}>
          <Counter {...x} indicator="hundreds" />
        </Table.Cell>
      )}
      <Table.Cell
        width={4}
        colSpan={
          Number(x.category) !== 0.5 &&
          Number(x.category) !== 0.25 &&
          !Number.isInteger(x.category)
            ? 2
            : undefined
        }
      >
        <Counter {...x} indicator="count" />
      </Table.Cell>

      <Table.Cell width={2}>
        {Number(x.category) === 0.5 ||
        Number(x.category) === 0.25 ||
        Number.isInteger(x.category)
          ? new Intl.NumberFormat("en-EG").format(x.category)
          : x.category}
      </Table.Cell>
    </Table.Row>
  ));
});

const Body = () => {
  const { data, total, required, requiredIsEdited, length } =
    useSnapshot(state).value;

  return (
    <Table.Body>
      <FN data={state.value.data} length={state.value.length} />
      <Table.Row>
        <Table.Cell textAlign="right">
          {new Intl.NumberFormat("en-EG").format(state.value.total)}
        </Table.Cell>
        <Table.Cell colSpan={3}>Counted</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell textAlign="right">
          {state.value.requiredIsEdited ? (
            <Input
              type="number"
              value={Number(state.value.required).toString()}
              onChange={(e) =>
                (state.value.required = Math.trunc(Number(e.target.value)))
              }
              onBlur={() =>
                (state.value.requiredIsEdited = !state.value.requiredIsEdited)
              }
            />
          ) : (
            <Input
              type="text"
              value={new Intl.NumberFormat("en-EG").format(
                Number(state.value.required).toString()
              )}
              onChange={(e) =>
                (state.value.required = Math.trunc(Number(e.target.value)))
              }
              onFocus={() =>
                (state.value.requiredIsEdited = !state.value.requiredIsEdited)
              }
            />
          )}
        </Table.Cell>
        <Table.Cell colSpan={3}>Required</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell
          textAlign="right"
          error={state.value.total - state.value.required !== 0}
          positive={state.value.total - state.value.required === 0}
        >
          {new Intl.NumberFormat("en-EG").format(
            state.value.total - state.value.required
          )}
        </Table.Cell>
        <Table.Cell colSpan={3}>Difference</Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};
