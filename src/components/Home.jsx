import TablePage from "./Table";
import { Checkbox, Container, Segment, Button, Grid } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { initial, state } from "../App";
import { subscribe, useSnapshot } from "valtio";

function Home() {
  const { moreCurrency, coinCurrency } = useSnapshot(state).value;

  const reset = () => {
    state.value.data = [...initial.data];
    state.value.required = initial.required;
    state.value.requiredIsEdited = initial.requiredIsEdited;
    state.value.coinCurrency = initial.coinCurrency;
    state.value.moreCurrency = initial.moreCurrency;
    state.value.addons = initial.addons;
    state.value.currentInput = initial.currentInput;
  };

  const addDW = () => {
    ++state.value.addons &&
      state.value.data.push({
        id: 11 + state.value.addons,
        category: `D/W No.${state.value.addons}`,
        count: 0,
        total: 0,
      });
  };
  const removeDW = () => {
    state.value.data.find(
      (x) =>
        Number(x.category) !== 0.5 &&
        Number(x.category) !== 0.25 &&
        !Number.isInteger(x.category)
    ) &&
      state.value.data.pop() &&
      --state.value.addons;
  };

  const moreCurrencyFn = () => {
    state.value.data = state.value.data.find(
      (x) => x.category === 1000 || x.category === 500 || x.category === 2
    )
      ? [...state.value.data.slice(2, 8), ...state.value.data.slice(9)]
      : [
          { id: 0, category: 1000, count: 0, hundreds: 0, total: 0 },
          { id: 1, category: 500, count: 0, hundreds: 0, total: 0 },
          ...state.value.data.slice(0, 6),
          { id: 8, category: 2, count: 0, hundreds: 0, total: 0 },
          ...state.value.data.slice(6),
        ];

    state.value.moreCurrency = !state.value.moreCurrency;
  };
  const coinCurrencyFn = () => {
    if (
      state.value.data.find((x) => x.category === 0.5 || x.category === 0.25)
    ) {
      if (
        state.value.data.find(
          (x) => x.category === 1000 || x.category === 500 || x.category === 2
        )
      ) {
        state.value.data = [
          ...state.value.data.slice(0, 10),
          ...state.value.data.slice(12),
        ];
      } else {
        state.value.data = [
          ...state.value.data.slice(0, 7),
          ...state.value.data.slice(9),
        ];
      }
    } else {
      if (
        state.value.data.find(
          (x) => x.category === 1000 || x.category === 500 || x.category === 2
        )
      ) {
        state.value.data = [
          ...state.value.data.slice(0, 10),
          { id: 10, category: 0.5, count: 0, hundreds: 0, total: 0 },
          { id: 11, category: 0.25, count: 0, hundreds: 0, total: 0 },
          ...state.value.data.slice(10),
        ];
      } else {
        state.value.data = [
          ...state.value.data.slice(0, 7),
          { category: 0.5, count: 0, hundreds: 0, total: 0 },
          { category: 0.25, count: 0, hundreds: 0, total: 0 },
          ...state.value.data.slice(7),
        ];
      }
    }
    state.value.coinCurrency = !state.value.coinCurrency;
  };
  return (
    <Container as={Segment}>
      <TablePage />

      <Grid verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={2}>
            <Button onClick={reset}> Reset </Button>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button.Group compact>
              <Button icon="add" onClick={addDW} />
              <Button.Or text="or" />
              <Button icon="minus" onClick={removeDW} />
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button.Group compact>
              <Button icon="redo" onClick={() => state.redo()} />
              <Button.Or text="or" />
              <Button icon="undo" onClick={() => state.undo()} />
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Checkbox
              toggle
              label="More categories"
              checked={moreCurrency}
              onClick={moreCurrencyFn}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Checkbox
              toggle
              label="Coins"
              checked={coinCurrency}
              onClick={coinCurrencyFn}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default React.memo(Home);
