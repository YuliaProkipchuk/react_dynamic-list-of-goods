import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

enum Mode {
  All,
  First5,
  Red,
  None,
}
export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [mode, setMode] = useState<Mode>(Mode.None);

  useEffect(() => {
    switch (mode) {
      case Mode.All: {
        getAll().then((data: Good[]) => setGoods(data));
        break;
      }

      case Mode.First5: {
        get5First().then((data: Good[]) => setGoods(data));
        break;
      }

      case Mode.Red: {
        getRedGoods().then((data: Good[]) => setGoods(data));
        break;
      }

      default:
        setGoods([]);
    }
  }, [mode]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => setMode(Mode.All)}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setMode(Mode.First5)}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => setMode(Mode.Red)}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
